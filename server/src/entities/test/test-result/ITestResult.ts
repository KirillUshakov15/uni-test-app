import {Marks} from "../../mark/IMark";
import {IUserData} from "../../user/IUser";
import {ITest} from "../ITest";

export interface ITestResult{
    mark: Marks,
    totalPoints: number;
    receivedPoints: number;
    percent: number;
    date: string;
    test: ITest;
    user: IUserData;
}

export interface ITestResultPagination{
    count: number;
    rows: ITestResult[]
}