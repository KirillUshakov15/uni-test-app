import {Module} from "@nestjs/common";
import {TestController} from "./test.controller";
import {TestService} from "./test.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {TokenModule} from "../token/token.module";
import {TestModel} from "./test.model";
import {QuestionModel} from "./question/question.model";
import {AnswerModel} from "./answer/answer.model";
import {GroupModel} from "../university/group/group.model";
import {TestsDistributionModel} from "./tests-distribution.model";
import {MarkModel} from "../mark/mark.model";
import {MarkModule} from "../mark/mark.module";
import {TestResultService} from "./test-result/test-result.service";
import {TestsResultModel} from "./test-result/test-result.model";

@Module({
    controllers: [TestController],
    providers: [TestService, TestResultService],
    imports: [
        SequelizeModule.forFeature([
            TestModel,
            TestsDistributionModel,
            QuestionModel,
            AnswerModel,
            GroupModel,
            MarkModel,
            TestsResultModel
        ]),
        MarkModule,
        TokenModule,
    ],
})
export class TestModule {}