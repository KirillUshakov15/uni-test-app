import {IsNotEmpty} from "class-validator";

export class AuthUserDto{

    @IsNotEmpty()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}