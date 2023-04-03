import {BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {TestModel} from "../test.model";
import { UserModel} from "../../user/user.model";
import {Marks} from "../../mark/IMark";
import {ITest} from "../ITest";
import {IUser, IUserData} from "../../user/IUser";
import {UserDataDto} from "../../user/dto/user-data.dto";

interface ITestsResultModelCreationAttr {
    userID: number;
    testID: number;
    mark: Marks,
    percent: number;
    totalPoints: number;
    receivedPoints: number;
    date: string;
}

@Table({tableName: 'tests-result', createdAt: false, updatedAt: false})
export class TestsResultModel extends Model<TestsResultModel, ITestsResultModelCreationAttr>{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ForeignKey(() => TestModel)
    @Column({type: DataType.INTEGER, allowNull: false, unique: false})
    testID: number

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, allowNull: false, unique: false})
    userID: number

    @BelongsTo(() => TestModel)
    test: ITest

    @BelongsTo(() => UserModel)
    user: IUser

    @Column({type: DataType.ENUM(...Object.values(Marks)), allowNull: false})
    mark: Marks

    @Column({type: DataType.INTEGER})
    percent: number;

    @Column({type: DataType.INTEGER})
    totalPoints: number;

    @Column({type: DataType.INTEGER})
    receivedPoints: number;

    @Column({type: DataType.STRING})
    date: string;
}