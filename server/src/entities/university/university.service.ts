import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {CreateUniversityDto} from "./dto/create-university.dto";
import {InjectModel} from "@nestjs/sequelize";
import {UniversityModel} from "./university.model";
import {IUniversity} from "./IUniversity";
import {GroupModel} from "./group/group.model";
import {ApiError} from "../../api-error/api-error";

@Injectable()
export class UniversityService{
    constructor(@InjectModel(UniversityModel)
         private readonly universityModel: typeof UniversityModel
    ) {}

    async create(universityDto: CreateUniversityDto): Promise<IUniversity>{
        return await this.universityModel.create(universityDto);
    }

    async getOne(id: number): Promise<IUniversity> | undefined{
        const university = await this.universityModel.findByPk(id);

        if(!university){
            throw ApiError.NotFound('Указанное учебное заведение не найдено');
        }

        return university;
    }

    async getAll(): Promise<IUniversity[]>{
        return await this.universityModel.findAll({include: [{all: true}]});
    }

    async edit(id: number, data: CreateUniversityDto): Promise<IUniversity>{
        await this.universityModel.update(data, {where: {id}});
        return await this.getOne(id)
    }

    async delete(id: number){
        await this.universityModel.destroy({where: {id}})
        return {
            message: 'Указанное учебное заведение успешно удалено'
        }
    }
}