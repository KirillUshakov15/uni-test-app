import {
    Body,
    Controller,
    Get,
    Param, ParseBoolPipe,
    Patch,
    Post,
    Query,
    UseGuards,
    UsePipes,
} from "@nestjs/common";
import {TestService} from "./test.service";
import {CreateTestDto} from "./dto/create-test.dto";
import {ITest, ITestsPagination} from "./ITest";
import {CheckAuthGuard} from "../../guards/check-auth.guard";
import {CheckRoleGuard} from "../../guards/check-role.guard";
import {Roles} from "../user/user.model";
import {ValidationPipe} from "../../pipes/validation.pipe";
import {User} from "../../decorators/User";
import {IUser} from "../user/IUser";
import {QueryTestDto} from "./dto/query-test.dto";
import {ITestResult, ITestResultPagination} from "./test-result/ITestResult";
import {QueryResultTestDto} from "./test-result/dto/query-result-test.dto";

@Controller('test')
export class TestController {
    constructor(private readonly testService: TestService,) {}

    @Post('/')
    @UseGuards(CheckAuthGuard, CheckRoleGuard(Roles.TEACHER))
    @UsePipes(ValidationPipe)
    async create(@Body() createTestDto: CreateTestDto, @User() user: IUser): Promise<ITest>{
        return await this.testService.create(createTestDto, user.id);
    }

    @Patch('/:id')
    @UseGuards(CheckAuthGuard, CheckRoleGuard(Roles.TEACHER))
    @UsePipes(ValidationPipe)
    async edit(@Body() editTestDto: CreateTestDto,
               @User() user: IUser,
               @Param('id') id: number
    ): Promise<void> {
        return await this.testService.edit(editTestDto, user.id, id);
    }

    @Get('/all')
    @UseGuards(CheckAuthGuard)
    @UsePipes(ValidationPipe)
    async getAll(@Query() query: QueryTestDto): Promise<ITestsPagination>{
        return this.testService.getAll(query);
    }

    @Get('/')
    @UseGuards(CheckAuthGuard)
    async getOne(@Query('id') id: number): Promise<ITest>{
        return this.testService.getOne(id);
    }

    @Get('/for-passing')
    @UseGuards(CheckAuthGuard, CheckRoleGuard(Roles.STUDENT))
    async getOneForPassing(@Query('id') id: number, @User() user: IUser): Promise<ITest>{
        return this.testService.getOneForPassing(id, user.groupID);
    }

    @Post('/calculate-result')
    @UseGuards(CheckAuthGuard, CheckRoleGuard(Roles.STUDENT))
    async calculateResult(@Body() passedTest: ITest, @User() user: IUser): Promise<void>{
        return await this.testService.calculateResult(passedTest, user.id)
    }

    @Get('/result')
    @UseGuards(CheckAuthGuard, CheckRoleGuard(Roles.STUDENT))
    async getResult(@Query() query: QueryResultTestDto): Promise<ITestResult>{
        return await this.testService.getResult(query)
    }

    @Get('/result/all')
    @UseGuards(CheckAuthGuard)
    async getAllResults(@Query() query: QueryResultTestDto): Promise<ITestResultPagination>{
        return await this.testService.getAllResults(query);
    }
}