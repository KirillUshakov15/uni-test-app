import {useEffect, useMemo, useState} from "react";
import {NavPanel} from "../components/NavPanel";
import {IQuestionPassing} from "../components/PassingTestLayout/PassingTestLayout";

export default function (questions: IQuestionPassing[]){
    const totalCount: number = questions?.length;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    const toggleQuestion = (questionIndex: number) => {
        if(questionIndex >= 0 && questionIndex < totalCount){
            setCurrentQuestionIndex(questionIndex)
        }
    }

    const goingForward = () => {
        toggleQuestion(currentQuestionIndex + 1)
    }

    const goingBack = () => {
        toggleQuestion(currentQuestionIndex - 1)
    }

    const NavigationPanel = () => useMemo(() => {
        return (
            <NavPanel
                questionsNumbers={questions}
                onToggleQuestion={toggleQuestion}
                currentQuestion={currentQuestionIndex}
            />
        )
    }, [totalCount, currentQuestionIndex]);

    return {
        NavigationPanel,
        goingBack,
        goingForward,
        currentQuestionIndex
    }
}