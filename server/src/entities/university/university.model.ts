import {Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {GroupModel} from "./group/group.model";
import {IGroup} from "./group/IGroup";

interface IUniversityCreationAttr {
    name: string;
    description?: string;
}

@Table({tableName: 'university', createdAt: false, updatedAt: false})
export class UniversityModel extends Model<UniversityModel, IUniversityCreationAttr>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

    @Column({type: DataType.STRING(1024)})
    description: string;

    @HasMany(() => GroupModel)
    groups: IGroup[]
}