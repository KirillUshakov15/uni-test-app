import {Module} from "@nestjs/common";
import {TokenService} from "./token.service";
import {JwtModule} from "@nestjs/jwt";
import {SequelizeModule} from "@nestjs/sequelize";
import {TokenModel} from "./token.model";

@Module({
    providers: [TokenService],
    imports: [
        JwtModule.register({}),
        SequelizeModule.forFeature([TokenModel]),
    ],
    exports: [TokenService]
})

export class TokenModule{}