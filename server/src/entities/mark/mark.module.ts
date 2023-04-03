import {Module} from "@nestjs/common";
import {MarkService} from "./mark.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {TestModel} from "../test/test.model";
import {MarkModel} from "./mark.model";

@Module({
    providers: [MarkService],
    imports: [
        SequelizeModule.forFeature([MarkModel, TestModel]),
    ],
    exports: [MarkService]
})
export class MarkModule {}