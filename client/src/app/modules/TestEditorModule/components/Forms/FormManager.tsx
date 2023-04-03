import React, {FC} from 'react';
import Step1Form from "./StepForms/Step1Form";
import Step2Form from "./StepForms/Step2Form";
import Step3Form from "./StepForms/Step3Form";

interface IFormManagerProps {
    currentStep: number
}

export const FormManager: FC<IFormManagerProps> = ({currentStep}) => {
    switch (currentStep) {
        case 2: {
            return(
                <Step2Form/>
            )
        }
        case 3: {
            return(
                <Step3Form/>
            )
        }
        default: {
            return(
                <Step1Form/>
            )
        }
    }
};
