import {Module} from "@nestjs/common";
import {UserController} from "./user.controller";
import {UserService} from "./user.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "./user.model";
import {MailModule} from "../mail/mail.module";
import {TokenModule} from "../token/token.module";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [
        SequelizeModule.forFeature([UserModel]),
        MailModule,
        TokenModule
    ],
    exports: [UserService]
})

export class UserModule {}