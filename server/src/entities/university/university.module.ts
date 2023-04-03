import {Module} from "@nestjs/common";
import {UniversityController} from "./university.controller";
import {UniversityService} from "./university.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {UniversityModel} from "./university.model";
import {GroupController} from "./group/group.controller";
import {GroupService} from "./group/group.service";
import {GroupModel} from "./group/group.model";
import {TokenModule} from "../token/token.module";
import {TestModel} from "../test/test.model";

@Module({
    controllers: [UniversityController, GroupController],
    providers: [UniversityService, GroupService],
    imports: [
        SequelizeModule.forFeature([UniversityModel, GroupModel, TestModel]),
        TokenModule
    ]
})
export class UniversityModule {}