import {ITestCreate} from "../../../models/ITestCreate";

export function hasValidationErrors(data: ITestCreate): string[]{
    const errors = [] as string[];

    if(!data.name){
        errors.push("Шаг 1 - Укажите название для теста")
    }
    if(data.name && data.name.length < 5){
        errors.push("Шаг 1 - Название теста не должно быть короче 5 символов")
    }
    if(data.description && data.description.length < 6){
        errors.push("Шаг 1 - Описание теста не должно быть короче 6 символов")
    }
    if(data.groups.length < 1){
        errors.push("Шаг 1 - Сделайте тест доступным хотя бы для одной учебной группы")
    }
    if(data.questions.length < 1){
        errors.push("Шаг 2 - Создайте хотя бы один вопрос")
    }

    return errors;

}