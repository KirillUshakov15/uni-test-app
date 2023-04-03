import {Injectable} from "@nestjs/common";
import {MailerService} from "@nestjs-modules/mailer";
import {ApiError} from "../../api-error/api-error";

@Injectable()
export class MailService{
    constructor(private readonly mailerService: MailerService) {}

    public async sendGrantAccessAccount(email: string): Promise<void> {
        try{
            await this.mailerService.sendMail({
                to: email,
                from: "uni-test-service@mail.ru",
                subject: 'Предоставлен доступ к сервису UniTest',
                template: './grant-access-template',
                context: {
                    email: email,
                },
            });
        }
       catch (e) {
            if(e?.responseCode === 550){
                throw ApiError.BadRequest(`Ошибка при отправке письма на адрес ${email}. Данный почтовый адрес не существует`);
            }
       }
    }

    public async sendRevokeAccessAccount(email: string): Promise<void> {
        try{
            await this.mailerService.sendMail({
                to: email,
                from: "uni-test-service@mail.ru",
                subject: 'Доступ к сервису UniTest ограничен',
                template: './revoke-access-template',
                context: {
                    email: email,
                },
            });
        }
        catch (e) {
            if(e?.responseCode === 550){
                throw ApiError.BadRequest(`Ошибка при отправке письма на адрес ${email}. Данный почтовый адрес не существует`);
            }
        }
    }
}