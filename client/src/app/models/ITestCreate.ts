import {QuestionTypes} from "./ITest";
import {IMark} from "./IMark";

export interface IAnswerCreate {
    id: string;
    text: string;
    isRight: boolean;
}

export interface IQuestionCreate {
    id: string;
    type: QuestionTypes;
    title: string;
    answers: IAnswerCreate[];
}

export interface ITestCreate {
    name: string;
    description?: string | null;
    groups: number[];
    marks: IMark;
    timeForPass: number;
    questions: IQuestionCreate[]
}