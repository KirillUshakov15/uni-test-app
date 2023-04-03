import {Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {TestModel} from "./test.model";
import {GroupModel} from "../university/group/group.model";

interface ITestsDistributionCreationAttr {
    testID: number;
    groupID: number;
}

@Table({tableName: 'tests-distribution', createdAt: false, updatedAt: false})
export class TestsDistributionModel extends Model<TestsDistributionModel, ITestsDistributionCreationAttr>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => TestModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    testID: number

    @ForeignKey(() => GroupModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    groupID: number

}