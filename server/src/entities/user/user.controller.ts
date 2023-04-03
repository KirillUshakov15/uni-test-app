import {Body, Controller, Get, Patch, Post, Query, UseGuards, UsePipes} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {IUser, IUserPagination} from "./IUser";
import {EditUserDto} from "./dto/edit-user.dto";
import {CheckAuthGuard} from "../../guards/check-auth.guard";
import {CheckRoleGuard} from "../../guards/check-role.guard";
import {Roles} from "./user.model";
import {QueryParamsDto} from "./dto/query-params.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('/')
    async create(@Body() userDto: CreateUserDto): Promise<IUser>{
        return await this.userService.create(userDto);
    }

    @Patch('/')
    async edit(@Body() editUserData: EditUserDto): Promise<IUser>{
        return await this.userService.edit(editUserData);
    }

    @Get('/all')
    @UseGuards(CheckAuthGuard, CheckRoleGuard(Roles.ADMIN))
    async getAll(@Query() query: QueryParamsDto): Promise<IUserPagination>{
        return await this.userService.getAll(query);
    }
}