import {IGroup} from "./IUniversity";
import {IMark} from "./IMark";

export enum QuestionTypes {
    ONE_CORRECT = "ONE_CORRECT",
    MANY_CORRECT = "MANY_CORRECT",
    ENTER_DATA = "ENTER_DATA"
}

export interface IAnswer {
    id: string;
    text: string;
    isRight: boolean;
}

export interface IQuestion {
    id: string;
    title: string;
    type: QuestionTypes;
    test: number;
    answers: IAnswer[]
}

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