import {ITest} from "./ITest";
import {IUser} from "./IUser";

export enum Marks{
    EXCELLENT = "Отлично",
    GOOD = "Хорошо",
    NORMAL = "Удовлетворительно",
    BAD = "Неудовлетворительно"
}

export interface ITestResult{
    id: number,
    mark: Marks,
    totalPoints: number;
    receivedPoints: number;
    percent: number;
    date: string;
    test: ITest;
    user: IUser;
}

export interface ITestResultPagination{
    count: number;
    rows: ITestResult[]
}