import {IUser, IUserData} from "../user/IUser";
import {Roles} from "../user/user.model";

export interface IAuth {
    userData: IUserData,
    refreshToken: string,
    accessToken: string
}