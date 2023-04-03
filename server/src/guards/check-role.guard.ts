import {CanActivate, ExecutionContext, Injectable, mixin} from "@nestjs/common";
import {Observable} from "rxjs";
import {ApiError} from "../api-error/api-error";

export const CheckRoleGuard = (role: string) => {
    @Injectable()
    class CheckRole implements CanActivate{
        canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            const req = context.switchToHttp().getRequest();
            const userRole = req?.user?.role;

            if(!userRole || userRole !== role){
                throw ApiError.Forbidden();
            }
            return true
        }
    }
    return mixin(CheckRole)
}
