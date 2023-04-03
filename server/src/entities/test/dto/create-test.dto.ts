import {CreateQuestionDto} from "../question/dto/create-question.dto";
import {ArrayNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength} from "class-validator";

interface IMarksCreate {
    excellent: number,
    good: number,
    normal: number
}

export class CreateTestDto{

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    name: string;

    @IsOptional()

    description?: string | null;

    @ArrayNotEmpty()
    groups: number[];

    @IsNotEmpty()
    marks: IMarksCreate;

    @IsNumber()
    @IsNotEmpty()
    timeForPass: number;

    @ArrayNotEmpty()
    questions: CreateQuestionDto[]
}
