import {IQuestionPassing} from "../components/PassingTestLayout/PassingTestLayout";

export default function (questions: IQuestionPassing[]){
    let answersStatus: string[] = [];

    questions.map((question, index) => {
        if(!question.isComplete){
            return answersStatus.push(`Вопрос №${index + 1} - ожидает ответа`);
        }
        return answersStatus.push(`Вопрос №${index + 1} - ответ предоставлен`)
    })

    return answersStatus;
}