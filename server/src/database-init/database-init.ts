import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "../entities/user/user.model";
import {TokenModel} from "../entities/token/token.model";
import {UniversityModel} from "../entities/university/university.model";
import {GroupModel} from "../entities/university/group/group.model";
import {TestModel} from "../entities/test/test.model";
import {QuestionModel} from "../entities/test/question/question.model";
import {AnswerModel} from "../entities/test/answer/answer.model";
import {TestsDistributionModel} from "../entities/test/tests-distribution.model";
import {TestsResultModel} from "../entities/test/test-result/test-result.model";
import {MarkModel} from "../entities/mark/mark.model";

const PostgresDBInit = SequelizeModule.forRoot({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '1479253',
        database: 'uni-test-database',
        models: [
            UserModel,
            TokenModel,
            UniversityModel,
            GroupModel,
            TestModel,
            QuestionModel,
            AnswerModel,
            TestsDistributionModel,
            TestsResultModel,
            MarkModel
        ],
        autoLoadModels: true
});

export default PostgresDBInit;
