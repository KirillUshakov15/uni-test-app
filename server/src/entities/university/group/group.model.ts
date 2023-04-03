import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UniversityModel} from "../university.model";
import {TestModel} from "../../test/test.model";
import {TestsDistributionModel} from "../../test/tests-distribution.model";
import {ITest} from "../../test/ITest";

interface IGroupCreationAttr {
    name: string;
    universityID: number;
}

@Table({tableName: 'group', createdAt: false, updatedAt: false})
export class GroupModel extends Model<GroupModel, IGroupCreationAttr>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @ForeignKey(() => UniversityModel)
    @Column({type: DataType.INTEGER, allowNull: false})
    universityID: number;

    @BelongsToMany(() => TestModel, () => TestsDistributionModel)
    tests: ITest[]
}