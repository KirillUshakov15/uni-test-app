import {IsNotEmpty, IsOptional, IsString, MinLength} from "class-validator";

export class CreateUniversityDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    readonly name: string;

    @IsString()
    @IsOptional()
    @MinLength(3)
    readonly description?: string | null
}