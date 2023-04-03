import {IsOptional} from "class-validator";
import {Transform, Type} from "class-transformer";

export class QueryTestDto {
    @Transform(({value}) => parseInt(value), {toClassOnly: true})
    limit: number

    @Transform(({value}) => parseInt(value), {toClassOnly: true})
    page: number

    @IsOptional()
    @Transform(({value}) => parseInt(value), {toClassOnly: true})
    author?: number | null;

    @IsOptional()
    @Transform(({value}) => parseInt(value), {toClassOnly: true})
    student?: number | null;

    @IsOptional()
    search: string

    @IsOptional()
    @Transform(({value}) => parseInt(value), {toClassOnly: true})
    group?: number

    @IsOptional()
    @Transform(({value}) => parseInt(value), {toClassOnly: true})
    time: number
}