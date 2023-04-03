import React, {useCallback, useMemo, useState} from "react";
import style from "../Form.module.scss";
import {IRule} from "./FormValidator";
import {ValidationTypes} from "./validation-types";

interface IError{
    type: string,
    message: string
}

export default function (){
    const [errors, setErrors] = useState<IError[]>([]);
    const [isDirty, setDirty] = useState(false);

    const addErrorMessage = (rule: IRule) => {
        if(!errors.find(error => error.type === rule.type))
            setErrors([...errors, {type: rule.type, message: rule.message}])
    }

    const deleteErrorMessage = (rule: IRule) => {
        setErrors(error => error.filter((err) => err.type !== rule.type))
    }

    const validateFields = useCallback((
        value: string, rules: IRule[], validateAllFields: boolean
    ) => {
        if(value || validateAllFields) setDirty(true);

        rules.map(rule => {
            switch (rule.type){
                case ValidationTypes.REQUIRED: {
                    if(!value){
                        return addErrorMessage(rule)
                    }
                    deleteErrorMessage(rule)

                    break;
                }
                case ValidationTypes.MIN_LENGTH: {
                    if(value?.length > 0 && value?.length < rule.value!){
                        return addErrorMessage(rule)
                    }
                    deleteErrorMessage(rule)

                    break;
                }
                case ValidationTypes.MAX_LENGTH: {
                    if(value?.length > rule.value!){
                        return addErrorMessage(rule)
                    }
                    deleteErrorMessage(rule)

                    break;
                }
                case ValidationTypes.PATTERN: {
                    if((rule.value instanceof RegExp)){
                        if(value?.length > 0 && !rule.value.test(value)){
                            return addErrorMessage(rule)
                        }
                        deleteErrorMessage(rule)
                    }

                    break;
                }
            }
        })
    }, []);

    const ErrorLabel = () => useMemo<JSX.Element>(() => {
        if(errors.length > 0 && isDirty){
            return (
                <span className={style.errorLabel}>{errors[errors.length - 1].message}</span>
            )
        }
        return <></>
    }, [])

    return {errors, validateFields, ErrorLabel, isDirty}
}