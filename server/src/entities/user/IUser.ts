import {Roles} from "./user.model";

export interface IUserData {
    id: number;
    email: string;
    firstName: string;
    secondName: string;
    patronymic?: string;
    role: Roles;
    universityID?: number;
    groupID?: number;
}

export interface IUser extends IUserData{
    password: string
    hasAccess: boolean,
}

export interface IUserPagination{
    count: number;
    rows: IUserData[]
}