import {QuestionTypes} from "./question.model";
import {IAnswer} from "../answer/IAnswer";

export interface IQuestion {
    id: number;
    title: string;
    type: QuestionTypes;
    test: number;
    answers: IAnswer[]
}