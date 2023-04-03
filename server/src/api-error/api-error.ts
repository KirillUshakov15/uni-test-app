import {HttpException} from "@nestjs/common";

export class ApiError extends HttpException{
    constructor(statusCode: number, message: string) {
        super(message, statusCode);
    }

    static BadRequest(message: string){
        return new ApiError(400, message);
    }

    static Unauthorised(){
        return new ApiError(401, 'Нет доступа, так как пользователь не авторизован');
    }

    static Forbidden(message: string = 'У Вас нет доступа для совершения данного действия'){
        return new ApiError(403, message)
    }

    static NotFound(message: string = 'По Вашему запросу ничего не найдено'){
        return new ApiError(404, message)
    }
}