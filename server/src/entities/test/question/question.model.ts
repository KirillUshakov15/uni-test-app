import {Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {TestModel} from "../test.model";
import {AnswerModel} from "../answer/answer.model";
import {IAnswer} from "../answer/IAnswer";

export enum QuestionTypes {
    ONE_CORRECT = "ONE_CORRECT",
    MANY_CORRECT = "MANY_CORRECT",
    ENTER_DATA = "ENTER_DATA"
}

interface IQuestionCreationAttr {
    id: string;
    title: string;
    type: string,
    test: number;
}

@Table({tableName: 'question', createdAt: false, updatedAt: false})
export class QuestionModel extends Model<QuestionModel, IQuestionCreationAttr>{
    //@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    //id: number;

    @Column({type: DataType.UUID, defaultValue: DataType.UUID, allowNull: false, primaryKey: true})
    id: string;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING})
    type: QuestionTypes;

    @ForeignKey(() => TestModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    test: number;

    @HasMany(() => AnswerModel)
    answers: IAnswer[]
}