import {QuestionTypes} from "../../../../models/ITest";
import React, {FC, memo, useContext} from "react";
import {Input, RadioButton} from "../../../../ui";
import {CheckBox} from "../../../../ui";
import {CreateTestDataContext} from "../TestEditorLayout";
import {IQuestionCreate} from "../../../../models/ITestCreate";
import style from './Answer.module.scss'

interface ISetAnswerProps {
    idAnswer: string;
    titleNumber: number;
    type: QuestionTypes;
    parentQuestion: IQuestionCreate
}

export const Answer: FC<ISetAnswerProps> = memo(({
                                                idAnswer,
                                                titleNumber,
                                                type,
                                                parentQuestion
}) => {
    const {data, setData} = useContext(CreateTestDataContext);

    const currentAnswer = parentQuestion.answers.find(answer => answer.id === idAnswer);

    const changeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        /*parentQuestion.answers.filter(answer => answer.id === idAnswer).map(answer => {
            return answer.text = e.target.value;
        })*/
        parentQuestion.answers.map(answer => {
            if(answer.id === idAnswer) return answer.text = e.target.value
        })
        setData({...data})
    }

    const removeAnswer = () => {
        /*data.questions.filter(question => question.id === parentQuestion.id).map(question => {
            question.answers = parentQuestion.answers.filter(answer => answer.id !== idAnswer);
        })*/
        parentQuestion.answers = parentQuestion.answers.filter(answer => answer.id !== idAnswer)
        setData({...data})
    }

    const changeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
        parentQuestion.answers.map(answer => {
            if(answer.id === idAnswer) return answer.isRight = e.target.checked;
            if(e.target.type === 'radio') return answer.isRight = false;
        })
        setData({...data})
    }

    return (
        <div>
            <div className={style.answersContainer}>
                <span>{titleNumber}</span>
                <Input placeholder="Введите ответ..."
                       value={currentAnswer?.text || ''}
                       onChange={changeText}
                />
                {type === QuestionTypes.ONE_CORRECT &&
                    <RadioButton
                        id={`answer${parentQuestion.id}-${idAnswer}`}
                        group={"answer-" + parentQuestion.id}
                        onChange={changeChecked}
                        checked={currentAnswer?.isRight}
                    />
                }
                {type === QuestionTypes.MANY_CORRECT &&
                    <CheckBox
                        id={`answer${parentQuestion.id}-${idAnswer}`}
                        onChange={changeChecked}
                        checked={currentAnswer?.isRight}
                    />
                }
                <span className={style.deleteBtn} onClick={removeAnswer}>X</span>
            </div>
        </div>

    )
});