export enum Roles {
    ADMIN = "ADMIN",
    STUDENT = "STUDENT",
    TEACHER = "TEACHER"
}

export interface IUser {
    id: number,
    email: string,
    firstName: string,
    secondName: string,
    patronymic?: string,
    hasAccess: boolean,
    role: Roles,
    universityID?: number,
    groupID?: number
}

export interface IUserPagination{
    count: number;
    rows: IUser[]
}