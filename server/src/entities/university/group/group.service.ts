import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {GroupModel} from "./group.model";
import {CreateGroupDto} from "./dto/create-group-dto";
import {IGroup} from "./IGroup";

@Injectable()
export class GroupService{
    constructor(@InjectModel(GroupModel)
        private readonly groupModel: typeof GroupModel,
    ) {}

    async create(createGroupDto: CreateGroupDto): Promise<IGroup>{
        return await this.groupModel.create(createGroupDto);
    }

    async getByUniversity(universityID: number): Promise<IGroup[]>{
        return await this.groupModel.findAll({where: {universityID}});
    }

    async getOne(universityID: number, groupID: number): Promise<IGroup>{
        return await this.groupModel.findOne({where: {id: groupID, universityID}});
    }

    async delete(id: number): Promise<Object>{
        await this.groupModel.destroy({where: {id}})
        return{
            message: 'Указанная группа успешно удалена'
        }
    }
}