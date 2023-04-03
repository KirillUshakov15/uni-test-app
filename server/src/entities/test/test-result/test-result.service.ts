import {Injectable} from "@nestjs/common";
import {IQuestion} from "../question/IQuestion";
import {QuestionTypes} from "../question/question.model";
import {IMark, Marks} from "../../mark/IMark";
import {ITest} from "../ITest";
import * as moment from "moment";
import {ApiError} from "../../../api-error/api-error";
import {InjectModel} from "@nestjs/sequelize";
import {TestsResultModel} from "./test-result.model";
import {UserModel} from "../../user/user.model";
import {TestModel} from "../test.model";
import {QueryResultTestDto} from "./dto/query-result-test.dto";
import {ITestResult, ITestResultPagination} from "./ITestResult";

@Injectable()
export class TestResultService {
    constructor(
        @InjectModel(TestsResultModel)
        private readonly testResultModel: typeof TestsResultModel,
    ) {}

    public async getAllResults(resultQuery: QueryResultTestDto): Promise<ITestResultPagination>{
        const {testID, student, author, limit, page, mark, search, group} = resultQuery;

        const testsResult = await this.testResultModel.findAndCountAll({
            include: [{model: UserModel, attributes: {exclude: ['password', 'hasAccess']}}, {model: TestModel}]
        });

        if(search){
            testsResult.rows = testsResult.rows.filter(testResult => {
                return testResult.test.name.toLowerCase().includes(search.toLowerCase())
                    || testResult.user.secondName.toLowerCase().includes(search.toLowerCase())
            });
        }

        if(author){
            testsResult.rows = testsResult.rows.filter(testResult => {
                return testResult.test.author === +author
            })
        }

        if(student){
            testsResult.rows = testsResult.rows.filter(testResult => {
                return testResult.userID === +student;
            })
        }

        if(testID){
            testsResult.rows = testsResult.rows.filter(testResult => {
                return testResult.testID === +testID;
            })
        }

        if(mark){
            testsResult.rows = testsResult.rows.filter(testResult => {
                return testResult.mark === mark
            })
        }

        if(+group){
            testsResult.rows = testsResult.rows.filter(testResult => {
                return testResult.user.groupID === +group
            });
        }

        testsResult.count = testsResult.rows.length;

        if(limit && page){
            const offset = page * limit - limit;
            testsResult.rows = testsResult.rows.slice(offset, (limit * page))
        }

        return testsResult

    }

    public async getResult(query: QueryResultTestDto): Promise<ITestResult>{
        const {testID, student} = query
        const testResult = await this.testResultModel.findOne({where: {testID, userID: student}});

        if(!testResult){
            throw ApiError.BadRequest("Результаты указанного теста не найдены");
        }

        return testResult;
    }

    public async calculateResult(passedTest: ITest, initialTest: ITest, userID: number): Promise<void>{
        let receivedPoints: number = 0;

        const totalPoints = initialTest.questions.length;

        receivedPoints = this.calculatePoints(initialTest.questions, passedTest.questions);

        const percent = Math.ceil((receivedPoints / totalPoints) * 100);
        const mark = this.setMark(percent, initialTest.marks);
        const date = moment().format("DD.MM.YYYY HH:mm")

        await this.testResultModel.create({
            userID, testID: initialTest.id, mark, receivedPoints, totalPoints, percent, date
        });
    }

    private calculatePoints(initQuestions: IQuestion[], passedQuestions: IQuestion[]): number{
        let points: number = 0;

        initQuestions.map(question => {
            const passedQuestion = passedQuestions.find(pQuestion => pQuestion.id === question.id)

            switch (question.type) {
                case QuestionTypes.ONE_CORRECT: {
                    return question.answers.map(answer => {
                        const passedAnswer = passedQuestion.answers.find(pAnswer => pAnswer.id === answer.id);
                        if (passedAnswer.isRight && passedAnswer.isRight === answer.isRight)
                            return points++
                    })
                }
                case QuestionTypes.MANY_CORRECT: {
                    let hasWrongAnswer = false;

                    question.answers.map(answer => {
                        const passedAnswer = passedQuestion.answers.find(pAnswer => pAnswer.id === answer.id);
                        if(passedAnswer.isRight !== answer.isRight){
                            hasWrongAnswer = true;
                        }
                    })

                    if(!hasWrongAnswer) points++;
                    return;
                }
            }
        });
        return points;
    }

    private setMark(percent: number, marks: IMark): Marks{
        if(percent >= marks.excellent) return Marks.EXCELLENT;
        if(percent >= marks.good && percent < marks.excellent) return Marks.GOOD;
        if(percent >= marks.normal && percent < marks.good) return Marks.NORMAL;

        return Marks.BAD
    }

}