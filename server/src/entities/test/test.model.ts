import {BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {UserModel} from "../user/user.model";
import {QuestionModel} from "./question/question.model";
import {IQuestion} from "./question/IQuestion";
import {GroupModel} from "../university/group/group.model";
import {TestsDistributionModel} from "./tests-distribution.model";
import {IGroup} from "../university/group/IGroup";
import {IUser} from "../user/IUser";
import {TestsResultModel} from "./test-result/test-result.model";
import {MarkModel} from "../mark/mark.model";
import {IMark} from "../mark/IMark";

interface ITestCreationAttr {
    name: string;
    description?: string | null,
    author: number;
    timeForPass: number;
}

@Table({tableName: 'test', createdAt: false, updatedAt: false})
export class TestModel extends Model<TestModel, ITestCreationAttr>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @Column({type: DataType.STRING({length: 1000})})
    description?: string;

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    author: number

    @HasOne(() => MarkModel)
    marks: IMark;

    @Column({type: DataType.INTEGER, allowNull: false})
    timeForPass: number

    @HasMany(() => QuestionModel)
    questions: IQuestion[]

    @BelongsToMany(() => GroupModel, () => TestsDistributionModel)
    groups: IGroup[]
}