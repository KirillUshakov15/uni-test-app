import {QuestionTypes} from "../question.model";
import {CreateAnswerDto} from "../../answer/dto/create-answer-dto";
import {IsNotEmpty, IsString, IsUUID, MinLength} from "class-validator";

export class CreateQuestionDto{

    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string;

    @IsNotEmpty()
    type: QuestionTypes;

    answers: CreateAnswerDto[]
}