import {IsNotEmpty, IsString, MinLength} from "class-validator";

export class EditPasswordDto{
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    readonly oldPassword: string;

    @IsString()
    @MinLength(6)
    readonly password: string

    @IsString()
    @IsNotEmpty()
    readonly confirmPassword: string
}