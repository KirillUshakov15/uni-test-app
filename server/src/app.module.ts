import {Module} from "@nestjs/common";
import {ConfigModule} from "@nestjs/config";
import {AuthModule} from "./entities/auth/auth.module";
import {UserModule} from "./entities/user/user.module";
import PostgresDBInit from "./database-init/database-init";
import {TokenModule} from "./entities/token/token.module";
import {UniversityModule} from "./entities/university/university.module";
import {TestModule} from "./entities/test/test.module";
import {MarkModule} from "./entities/mark/mark.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        PostgresDBInit,
        AuthModule,
        UserModule,
        TokenModule,
        UniversityModule,
        TestModule,
        MarkModule
    ],
})

export class AppModule{}
