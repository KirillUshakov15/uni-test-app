import {BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {UniversityModel} from "../university/university.model";
import {ITest} from "../test/ITest";
import {TestModel} from "../test/test.model";
import {TestsResultModel} from "../test/test-result/test-result.model";
import {Exclude} from "class-transformer";

export enum Roles {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
    TEACHER = "TEACHER"
}

interface IUserCreationAttr {
    email: string,
    password: string,
    firstName: string,
    secondName: string,
    patronymic?: string
    hasAccess: boolean,
    role: Roles
}

@Table({tableName: 'user', createdAt: false, updatedAt: false})
export class UserModel extends Model<UserModel, IUserCreationAttr>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, allowNull: false})
    firstName: string

    @Column({type: DataType.STRING, allowNull: false})
    secondName: string

    @Column({type: DataType.STRING})
    patronymic: string

    @Column({type: DataType.BOOLEAN, allowNull: false})
    hasAccess: boolean

    @Column({type: DataType.ENUM(...Object.values(Roles)), allowNull: false})
    role: Roles

    //@ForeignKey(() => UniversityModel)
    @Column({type: DataType.INTEGER})
    universityID: number;

    @Column({type: DataType.INTEGER})
    groupID: number

    //@BelongsToMany(() => TestModel, () => TestsResultModel)
    //tests: ITest[]
}