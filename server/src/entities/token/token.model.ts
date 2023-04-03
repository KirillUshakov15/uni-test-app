import {Column, DataType, ForeignKey, HasOne, Model, Table} from "sequelize-typescript";
import {UserModel} from "../user/user.model";

interface ITokenCreationAttr {
    userID: number
    refreshToken: string,
}

@Table({tableName: 'token', createdAt: false, updatedAt: false})
export class TokenModel extends Model<TokenModel, ITokenCreationAttr>{
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING(512), allowNull: false,})
    refreshToken: string;

    @ForeignKey(() => UserModel)
    @Column({type: DataType.INTEGER, unique: true, allowNull: false})
    userID: number;
}
