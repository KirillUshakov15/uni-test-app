import {Injectable} from "@nestjs/common";
import {TestModel} from "./test.model";
import {QuestionModel} from "./question/question.model";
import {CreateTestDto} from "./dto/create-test.dto";
import {CreateQuestionDto} from "./question/dto/create-question.dto";
import {InjectModel} from "@nestjs/sequelize";
import {CreateAnswerDto} from "./answer/dto/create-answer-dto";
import {AnswerModel} from "./answer/answer.model";
import {ITest, ITestsPagination} from "./ITest";
import {TestsDistributionModel} from "./tests-distribution.model";
import {ApiError} from "../../api-error/api-error";
import {MarkService} from "../mark/mark.service";
import {QueryTestDto} from "./dto/query-test.dto";
import {TestResultService} from "./test-result/test-result.service";
import {ITestResult, ITestResultPagination} from "./test-result/ITestResult";
import {QueryResultTestDto} from "./test-result/dto/query-result-test.dto";

@Injectable()
export class TestService {
    constructor(@InjectModel(TestModel)
                private readonly testModel: typeof TestModel,
                @InjectModel(QuestionModel)
                private readonly questionModel: typeof QuestionModel,
                @InjectModel(AnswerModel)
                private readonly answerModel: typeof AnswerModel,
                @InjectModel(TestsDistributionModel)
                private readonly testDistributionModel: typeof TestsDistributionModel,

                private readonly testResultService: TestResultService,

                private readonly markService: MarkService
                ) {}

    public async getAll(query: QueryTestDto): Promise<ITestsPagination>{
        const {limit, page, author, search, group, time, student} = query;

        const offset = page * limit - limit;

        const tests = await this.testModel.findAndCountAll({
            include: [{all: true}], distinct: true
        });

        if(student){
            const passedTests = await this.testResultService.getAllResults({student: student})

            tests.rows = tests.rows.filter(test => {
                const testAlreadyPassed = passedTests.rows.find(passedTest => passedTest.test.id === test.id)
                if(!testAlreadyPassed) return test;
            })
        }

        if(author){
            tests.rows = tests.rows.filter(test => {
                return test.author === +author;
            });
        }

        if(search){
            tests.rows = tests.rows.filter(test => {
                return test.name.toLowerCase().includes(search.toLowerCase())
            });
        }

        if(+group){
            tests.rows = tests.rows.filter(test => {
                return test.groups.find(gr => gr.id === +group)
            });
        }

        if(time){
            tests.rows = tests.rows.filter(test => {
                if(time === 0)
                    return test.timeForPass === 0;
                return test.timeForPass >= time;
            });
        }

        tests.count = tests.rows.length;
        tests.rows = tests.rows.slice(offset, (limit * page))

        return tests;
    }

    public async getOne(id: number): Promise<ITest>{
        const test = await this.testModel.findByPk(id, {include: [{all: true, nested: true}]})
        if(!test){
            throw ApiError.BadRequest('По Вашему запросу ничего не найдено');
        }
        return test;
    }

    public async getOneForPassing(id: number, userGroupID: number): Promise<ITest>{
        const test = await this.getOne(id);

        if(!test.groups.some(group => group.id === userGroupID)){
            throw ApiError.Forbidden();
        }

        test.questions.map(question => {
            return question.answers.map(answer => {
                return answer.isRight = false;
            })
        });

        return test;
    }

    async calculateResult(passedTest: ITest, userID: number): Promise<void>{
        const initialTest = await this.getOne(passedTest.id);
        return await this.testResultService.calculateResult(passedTest, initialTest, userID)
    }

    async getResult(query: QueryResultTestDto): Promise<ITestResult>{
        return await this.testResultService.getResult(query)
    }

    async getAllResults(query: QueryResultTestDto): Promise<ITestResultPagination>{
        return await this.testResultService.getAllResults(query)
    }

    public async edit(editTestDto: CreateTestDto, author: number, id: number): Promise<void>{
        const test = await this.testModel.findByPk(id, {include: [{all: true, nested: true}]})

        await test.update({
            name: editTestDto.name,
            description: editTestDto.description,
            timeForPass: editTestDto.timeForPass
        });

        await this.testDistributionModel.destroy({where: {testID: id}});
        test.questions.map((question) => {
            return this.answerModel.destroy({where: {question: question.id}})
        })
        await this.questionModel.destroy({where: {test: id}});

        await this.markService.edit({id: test.marks.id, testID: test.id, ...editTestDto.marks});

        await this.createQuestions(id, editTestDto.questions);
        this.distribute(id, editTestDto.groups);
    }

    public async create(createTestDto: CreateTestDto, author: number): Promise<ITest>{
        const test = await this.testModel.create({
            ...createTestDto,
            author,
        });
       await this.markService.create({testID: test.id, ...createTestDto.marks});
       await this.createQuestions(test.id, createTestDto.questions);
       this.distribute(test.id, createTestDto.groups);
       return test;
    }

    private async createQuestions(testID: number, questions: CreateQuestionDto[]): Promise<void>{
        await Promise.all(questions.map((question) => {
            return this.questionModel.create({...question, test: testID})
                .then(res => this.createAnswers(res.id, question.answers))
        }));
    }

    private createAnswers(questionID: string, answers: CreateAnswerDto[]): void{
        answers.map((answer) => {
            if(answer.text){
                return this.answerModel.create({...answer, question: questionID})
            }
        });
    }

    private distribute(testID: number, groups: number[]){
        groups.map(group => {
            return this.testDistributionModel.create({testID: testID, groupID: group})
        })
    }
}