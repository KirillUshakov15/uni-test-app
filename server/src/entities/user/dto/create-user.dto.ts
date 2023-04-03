import {IsEmail, IsEnum, IsOptional, IsString, MinLength} from "class-validator";
import {Roles} from "../user.model";

export class CreateUserDto {
    @IsEmail()
    @MinLength(2)
    readonly email: string;

    @IsString()
    @MinLength(6)
    readonly password: string;

    readonly confirmPassword: string;

    @IsString()
    @MinLength(2)
    readonly firstName: string;

    @IsString()
    @MinLength(2)
    readonly secondName: string;

    @IsOptional()
    readonly patronymic?: string | null;

    readonly hasAccess: boolean;

    @IsEnum(Roles)
    readonly role: Roles

    readonly universityID?: number | null;

    readonly groupID?: number | null;
}