import {IRule, ValidationTypes} from "../ui/Form";

export const isRequiredField: IRule = {
    type: ValidationTypes.REQUIRED,
    message: 'Данное поле обязательно к заполнению'
}

export const isCorrectUsername: IRule = {
    type: ValidationTypes.MIN_LENGTH,
    message: 'Не должно быть короче 2 символов',
    value: 2
}

export const isCorrectEmail: IRule[] = [
    isRequiredField, {
    type: ValidationTypes.PATTERN,
    message: 'Email имеет неверный формат',
    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}]

export const isCorrectPassword: IRule[] = [
    isRequiredField, {
    type: ValidationTypes.PATTERN,
    message: 'Пароль имеет неверный формат',
    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
}]