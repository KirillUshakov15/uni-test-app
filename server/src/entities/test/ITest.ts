import {IQuestion} from "./question/IQuestion";
import {IGroup} from "../university/group/IGroup";
import {IMark, Marks} from "../mark/IMark";
import {IUser, IUserData} from "../user/IUser";
import {UserDataDto} from "../user/dto/user-data.dto";

export interface ITest {
    id: number;
    name: string;
    description?: string;
    author: number;
    marks: IMark
    groups: IGroup[];
    timeForPass: number;
    questions: IQuestion[]
}

export interface ITestsPagination {
    count: number,
    rows: ITest[]
}