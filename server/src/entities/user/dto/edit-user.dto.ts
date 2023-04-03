import {IsOptional, IsString, MinLength} from "class-validator";

export class EditUserDto {
    id: number;

    @IsString()
    @MinLength(2)
    readonly firstName: string;

    @IsString()
    @MinLength(2)
    readonly secondName: string;

    @IsOptional()
    readonly patronymic?: string | null;
}