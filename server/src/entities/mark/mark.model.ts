import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {TestModel} from "../test/test.model";

interface IMarkModelCreationAttr{
    testID: number;
    excellent: number;
    good: number;
    normal: number;
}

@Table({tableName: 'mark', createdAt: false, updatedAt: false})
export class MarkModel extends Model<MarkModel, IMarkModelCreationAttr>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => TestModel)
    @Column({type: DataType.INTEGER, unique: true})
    testID: number;

    @Column({type: DataType.INTEGER})
    excellent: number;

    @Column({type: DataType.INTEGER})
    good: number;

    @Column({type: DataType.INTEGER})
    normal: number
}