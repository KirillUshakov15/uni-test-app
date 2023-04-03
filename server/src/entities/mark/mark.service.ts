import {Injectable} from "@nestjs/common";
import {MarkModel} from "./mark.model";
import {CreateMarkDto} from "./dto/create-mark.dto";
import {InjectModel} from "@nestjs/sequelize";
import {IMark} from "./IMark";

@Injectable()
export class MarkService{
    constructor(
        @InjectModel(MarkModel)
        private readonly markModel: typeof MarkModel) {}

    public async create(markCreationData: CreateMarkDto){
        return await this.markModel.create(markCreationData);
    }

    public async edit(editMarkData: IMark){
        console.log(editMarkData)
        return await this.markModel.update({...editMarkData}, {where: {id: editMarkData.id}})
    }
}