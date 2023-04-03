import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {TokenModel} from "./token.model";
import {JwtService} from "@nestjs/jwt";
import {IUser} from "../user/IUser";
import {UserDataDto} from "../user/dto/user-data.dto";
import {IToken} from "./IToken";
import {ApiError} from "../../api-error/api-error";
import {IAuth} from "../auth/IAuth";

@Injectable()
export class TokenService{
    constructor(@InjectModel(TokenModel)
                private tokenModel: typeof TokenModel,
                private jwt: JwtService
    ) {}

    public async generateToken(user: IUser): Promise<IAuth>{
        const userData = new UserDataDto(user);
        const accessToken = this.jwt.sign({...userData}, {secret: process.env.ACCESS_TOKEN_KEY, expiresIn: '15m'});
        const refreshToken = this.jwt.sign({...userData}, {secret: process.env.REFRESH_TOKEN_KEY, expiresIn: '30d'});
        await this.saveToken(userData.id, refreshToken);
        return {
            userData,
            accessToken,
            refreshToken
        }
    }

    private async saveToken(userID: number, refreshToken: string): Promise<IToken>{
        const token = await this.tokenModel.findOne({where: {userID}})

        if(token){
            token.refreshToken = refreshToken;
            return await token.save();
        }

        return await this.tokenModel.create({
            userID: userID,
            refreshToken: refreshToken
        });
    }

    public async findToken(refreshToken: string): Promise<IToken>{
        const token = await this.tokenModel.findOne({where: {refreshToken: refreshToken}})
        return token
    }

    public validateToken(token: string, key: string): UserDataDto{
        try{
            if(!token){
                throw ApiError.Unauthorised();
            }

            return this.jwt.verify(token, {secret: key})
        }
        catch{
            return null;
        }
    }

    public async removeToken(refreshToken: string){
        return await this.tokenModel.destroy({where: {refreshToken: refreshToken}})
    }
}