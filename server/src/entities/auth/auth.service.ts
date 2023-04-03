import {Injectable} from "@nestjs/common";
import {UserService} from "../user/user.service";
import {AuthUserDto} from "../user/dto/auth-user.dto";
import * as bcrypt from "bcryptjs"
import {CreateUserDto} from "../user/dto/create-user.dto";
import {TokenService} from "../token/token.service";
import {Response} from "express";
import {ChangeAccessAccountDto} from "./dto/change-access-account.dto";
import {ApiError} from "../../api-error/api-error";
import {Roles} from "../user/user.model";
import {IAuth} from "./IAuth";
import {EditUserDto} from "../user/dto/edit-user.dto";
import {EditPasswordDto} from "../user/dto/edit-password.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {}

    async login(userDto: AuthUserDto): Promise<IAuth> {
        const user = await this.userService.findByEmail(userDto.email);

        if(user){
            if(await bcrypt.compare(userDto.password, user.password)){

                if(!user.hasAccess){
                    throw ApiError.Forbidden(`Уважаемый ${user.firstName}, администрация сервиса пока что не подтвердила 
                    Ваш аккаунт. Следите за изменениями на своей электронной почте: ${user.email}`)
                }

                return await this.tokenService.generateToken(user);
            }
        }
        throw ApiError.BadRequest('Неверный email или пароль');
    }

    async registration(userDto: CreateUserDto): Promise<void>{
        const candidate = await this.userService.findByEmail(userDto.email);

        if(candidate){
            throw ApiError.BadRequest('Пользователь с таким email уже зарегистрирован');
        }

        if(userDto.password !== userDto.confirmPassword){
            throw ApiError.BadRequest('Указанные пароли не совпадают');
        }

        let hasAccess = false;
        if(userDto.role === Roles.ADMIN) {
            hasAccess = true;
        }
        const passwordHash = await bcrypt.hash(userDto.password, 5);
        await this.userService.create({...userDto, password: passwordHash, hasAccess: hasAccess});
    }

    async refreshAccess(refreshToken: string){
        if(!refreshToken) throw ApiError.Unauthorised();

        const tokenInDB = await this.tokenService.findToken(refreshToken);
        const tokenIsValid = await this.tokenService.validateToken(refreshToken, process.env.REFRESH_TOKEN_KEY);

        if(tokenInDB && tokenIsValid){
            const user = await this.userService.findOne(tokenIsValid.id);
            return await this.tokenService.generateToken(user);
        }
        throw ApiError.Unauthorised();
    }

    async logout(refreshToken: string){
        return await this.tokenService.removeToken(refreshToken)
    }

    async editProfile(editData: EditUserDto, id: number): Promise<IAuth>{
        const user = await this.userService.edit({...editData, id: id});
        return await this.tokenService.generateToken(user);
    }

    async changePassword(editPasswordData: EditPasswordDto, id: number): Promise<void>{
        const user = await this.userService.findById(id);

        if(!await bcrypt.compare(editPasswordData.oldPassword, user.password)){
            throw ApiError.BadRequest('Указан неверный пароль')
        }

        if(editPasswordData.password !== editPasswordData.confirmPassword){
            throw ApiError.BadRequest('Указанные пароли не совпадают')
        }

        const hashPassword = await bcrypt.hash(editPasswordData.password, 5)

        await user.update({
            password: hashPassword
        })
    }

    async changeAccessAccount(accessAccountDto: ChangeAccessAccountDto): Promise<{message: string}>{
        const {email, accessState} = accessAccountDto;
        return await this.userService.changeAccessAccount(email, accessState);
    }

    saveCookie(res: Response, refreshToken: string){
        res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false });
    }

}