import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
    UsePipes
} from "@nestjs/common";
import {CreateUniversityDto} from "./dto/create-university.dto";
import {UniversityService} from "./university.service";
import {CheckAuthGuard} from "../../guards/check-auth.guard";
import {CheckRoleGuard} from "../../guards/check-role.guard";
import {Roles} from "../user/user.model";
import {ValidationPipe} from "../../pipes/validation.pipe";
import {IUniversity} from "./IUniversity";

@Controller('university')
export class UniversityController{
    constructor(private readonly universityService: UniversityService) {}

    @Post('/')
    @UseGuards(CheckAuthGuard, CheckRoleGuard(Roles.ADMIN))
    @UsePipes(ValidationPipe)
    async create(@Body() universityDto: CreateUniversityDto){
        return await this.universityService.create(universityDto);
    }

    @Get('/')
    async getOne(@Query('id') id: number){
        return await this.universityService.getOne(id);
    }

    @Get('/all')
    async getAll(): Promise<IUniversity[]>{
        return await this.universityService.getAll();
    }

    @Patch('/:id')
    @UseGuards(CheckAuthGuard, CheckRoleGuard(Roles.ADMIN))
    @UsePipes(ValidationPipe)
    async edit(@Param('id') id: number, @Body() updateDto: CreateUniversityDto){
        return await this.universityService.edit(id, updateDto)
    }

    @Delete('/:id')
    @UseGuards(CheckAuthGuard, CheckRoleGuard(Roles.ADMIN))
    async delete(@Param('id') id: number){
        return await this.universityService.delete(id)
    }
}