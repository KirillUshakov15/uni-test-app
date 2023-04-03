import {IUser, Roles} from "./IUser";

export interface IAuth {
    userData: IUser,
    accessToken: string,
    refreshToken: string
}

export interface ILogin{
    email: string;
    password: string
}

export interface IRegistration {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    secondName: string;
    patronymic?: string;
    role: Roles | null;
    universityID: number | null;
    groupID: number | null;
}