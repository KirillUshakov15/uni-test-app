import {Body, Controller, Get, Patch, Post, Req, Res, UseGuards, UsePipes} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthUserDto} from "../user/dto/auth-user.dto";
import {CreateUserDto} from "../user/dto/create-user.dto";
import {Response, Request} from 'express'
import {ChangeAccessAccountDto} from "./dto/change-access-account.dto";
import {CheckAuthGuard} from "../../guards/check-auth.guard";
import {CheckRoleGuard} from "../../guards/check-role.guard";
import {Roles} from "../user/user.model";
import {ValidationPipe} from "../../pipes/validation.pipe";
import {IAuth} from "./IAuth";
import {EditUserDto} from "../user/dto/edit-user.dto";
import {User} from "../../decorators/User";
import {IUser} from "../user/IUser";
import {EditPasswordDto} from "../user/dto/edit-password.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/login')
    @UsePipes(ValidationPipe)
    async login(@Body() userDto: AuthUserDto, @Res({ passthrough: true }) res: Response): Promise<IAuth>{
        const data = await this.authService.login(userDto);
        this.authService.saveCookie(res, data.refreshToken)
        return data;
    }

    @Post('/registration')
    @UsePipes(ValidationPipe)
    async registration(@Body() userDto: CreateUserDto, @Res({ passthrough: true }) res: Response): Promise<void>{
        return await this.authService.registration(userDto);
    }

    @Get('/refresh-access')
    async refreshAccess(@Req() req: Request, @Res({ passthrough: true }) res: Response): Promise<IAuth>{
        const {refreshToken} = req.cookies;
        const data = await this.authService.refreshAccess(refreshToken);
        this.authService.saveCookie(res, data.refreshToken);
        return data;
    }

    @Get('/logout')
    async logout(@Req() req: Request){
        const {refreshToken} = req.cookies;
        return await this.authService.logout(refreshToken);
    }

    @Post('/change-access-state')
    @UseGuards(CheckAuthGuard, CheckRoleGuard(Roles.ADMIN))
    async changeAccessAccount(@Body() activationStatusDto: ChangeAccessAccountDto): Promise<{message: string}>{
        return await this.authService.changeAccessAccount(activationStatusDto);
    }

    @Patch('/edit-profile')
    @UseGuards(CheckAuthGuard)
    @UsePipes(ValidationPipe)
    async editProfile(@Body() editData: EditUserDto,
                      @User() user: IUser,
                      @Res({ passthrough: true }) res: Response
    ): Promise<IAuth>{
        const data = await this.authService.editProfile(editData, user.id);
        this.authService.saveCookie(res, data.refreshToken);
        return data;
    }

    @Patch('/change-password')
    @UseGuards(CheckAuthGuard)
    @UsePipes(ValidationPipe)
    async changePassword(@Body() editPasswordData: EditPasswordDto, @User() user: IUser): Promise<void>{
        return await this.authService.changePassword(editPasswordData, user.id);
    }
}