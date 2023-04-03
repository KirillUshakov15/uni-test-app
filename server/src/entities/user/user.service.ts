import {Injectable} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {Roles, UserModel} from "./user.model";
import {InjectModel} from "@nestjs/sequelize";
import {IUser, IUserPagination} from "./IUser";
import {MailService} from "../mail/mail.service";
import {EditUserDto} from "./dto/edit-user.dto";
import {QueryParamsDto} from "./dto/query-params.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel)
        private userModel: typeof UserModel,
        private mailService: MailService
    ) {}

    async create(userDto: CreateUserDto): Promise<IUser>{
        return await this.userModel.create(userDto);
    }

    async edit(editData: EditUserDto): Promise<IUser>{
        const user = await this.userModel.findByPk(editData.id);

        await user.update({
            firstName: editData.firstName,
            secondName: editData.secondName,
            patronymic: editData.patronymic,
        });

        return user;
    }

    async findOne(id: number): Promise<IUser>{
        return await this.userModel.findOne({where: {id}})
    }

    async changeAccessAccount(email: string, accessState: boolean): Promise<{message: string}>{
        await this.userModel.update({hasAccess: accessState}, {where: {email}});

        let message = `Доступ к сервису для ${email}`

        if(accessState){
            await this.mailService.sendGrantAccessAccount(email);
            message += ' предоставлен';
        }
        else{
            await this.mailService.sendRevokeAccessAccount(email)
            message += ' ограничен'
        }

        return {
            message
        }
    }

    async getAll(query: QueryParamsDto): Promise<IUserPagination>{
        const {limit, page, role, hasAccess, university, search} = query;

        const users = await this.userModel.findAndCountAll({attributes: {exclude: ['password']}});

        const offset = page * limit - limit;

        users.rows = users.rows.filter(user => {
            return user.role !== Roles.ADMIN
        });

        if(role){
            users.rows = users.rows.filter(user => {
                return user.role === role
            })
        }

        if(search){
            users.rows = users.rows.filter(user => {
                return user.secondName.toLowerCase().includes(search.toLowerCase())
            });
        }

        if(+university){
            users.rows = users.rows.filter(user => {
                return user.universityID === +university
            })
        }

        if(hasAccess){
            users.rows = users.rows.filter(user => {
                if (hasAccess === 'false') {
                    return user.hasAccess === false
                }
                return user.hasAccess === true
            })
        }

        users.count = users.rows.length;
        users.rows = users.rows.slice(offset, (limit * page))

        return users;
    }

    async findByEmail(email: string): Promise<IUser> | undefined{
        return await this.userModel.findOne({where: {email}, include: [{all: true, nested: true}]})
    }

    async findById(id: number): Promise<UserModel> | undefined{
        return await this.userModel.findByPk(id);
    }
}