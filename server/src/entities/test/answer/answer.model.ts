import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {QuestionModel} from "../question/question.model";

interface IAnswerCreationAttr {
    id: string;
    text: string,
    isRight: boolean;
    question: string;
}

@Table({tableName: 'answer', createdAt: false, updatedAt: false})
export class AnswerModel extends Model<AnswerModel, IAnswerCreationAttr>{
    //@Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    //id: number;

    @Column({type: DataType.UUID, defaultValue: DataType.UUID, allowNull: false, primaryKey: true})
    id: string;

    @Column({type: DataType.STRING, allowNull: false})
    text: string;

    @Column({type: DataType.BOOLEAN})
    isRight: boolean;

    @ForeignKey(() => QuestionModel)
    @Column({type: DataType.UUID, allowNull: false})
    question: string;
}