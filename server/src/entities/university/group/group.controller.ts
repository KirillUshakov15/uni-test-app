import {Body, Controller, Delete, Get, Param, Post, Query, UseGuards, UsePipes} from "@nestjs/common";
import {GroupService} from './group.service'
import {CreateGroupDto} from "./dto/create-group-dto";
import {IGroup} from "./IGroup";
import {CheckAuthGuard} from "../../../guards/check-auth.guard";
import {CheckRoleGuard} from "../../../guards/check-role.guard";
import {Roles} from "../../user/user.model";
import {ValidationPipe} from "../../../pipes/validation.pipe";

@Controller('group')
export class GroupController{
    constructor(private readonly groupService: GroupService) {}

    @Post('/')
    @UseGuards(CheckAuthGuard, CheckRoleGuard(Roles.ADMIN))
    @UsePipes(ValidationPipe)
    async create(@Body() createGroupDto: CreateGroupDto): Promise<IGroup>{
        return await this.groupService.create(createGroupDto);
    }

    @Get('/')
    async getByUniversity(@Query('universityID') universityID: number): Promise<IGroup[]>{
        return this.groupService.getByUniversity(universityID);
    }

    @Get('/one')
    async getOne(@Query('universityID') universityID: number, @Query('groupID') groupID: number): Promise<IGroup>{
        return this.groupService.getOne(universityID, groupID);
    }

    @Delete('/:id')
    @UseGuards(CheckAuthGuard, CheckRoleGuard(Roles.ADMIN))
    async delete(@Param('id') id: number): Promise<Object>{
        return this.groupService.delete(id);
    }
}