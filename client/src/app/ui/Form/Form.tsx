import React, {
    Children,
    createContext,
    FC, useCallback, useEffect, useMemo, useRef,
    useState
} from 'react';
import {FormValidator} from "./FormValidator/FormValidator";
import useValidation from "./FormValidator/useValidation";

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement>{
    children: React.ReactNode
    onFinish: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface FormExtensions{
    Validator: typeof FormValidator
}

interface IValidation {
    allFields: boolean,
    success: boolean
}

const validationInitialState = {
    allFields: false,
    success: false
}

interface IValidationContextExtension {
    validation: IValidation,
    setValidation: React.Dispatch<React.SetStateAction<IValidation>>,
}

export const FormContext = createContext<IValidationContextExtension>({
    validation: validationInitialState,
    setValidation: () => {}
})

export const Form: FC<IFormProps> & FormExtensions = ({children,onFinish, ...props}) => {
    const [validation, setValidation] = useState<IValidation>(validationInitialState)

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateForm();
        onFinish(e);
    }

    const validateForm =() => {
        setValidation({...validation, allFields: true})
    }

    return (
        <form {...props} onSubmit={submit}>
            <FormContext.Provider value={{validation, setValidation}}>
                {children}
            </FormContext.Provider>
        </form>
    );
};



Form.Validator = FormValidator;