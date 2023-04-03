import {IUser} from "../IUser";
import {Roles} from "../user.model";

export class UserDataDto{
    readonly id: number;
    readonly email: string;
    readonly firstName: string;
    readonly secondName: string;
    readonly patronymic?: string;
    readonly role: Roles;
    readonly universityID?: number;
    readonly groupID?: number;

    constructor(user: IUser | UserDataDto) {
        this.id = user.id;
        this.email = user.email;
        this.firstName = user.firstName;
        this.secondName = user.secondName;
        this.patronymic = user?.patronymic;
        this.role = user.role;
        this.universityID = user?.universityID;
        this.groupID = user?.groupID;
    }
}