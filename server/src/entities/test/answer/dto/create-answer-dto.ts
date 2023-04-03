import {IsBoolean, IsNotEmpty, IsString, IsUUID, MinLength} from "class-validator";

export class CreateAnswerDto{

    @IsUUID()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsBoolean()
    isRight: boolean;
}