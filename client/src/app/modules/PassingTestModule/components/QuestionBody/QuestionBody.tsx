import React, {FC, memo, useMemo} from 'react';
import {IQuestion, QuestionTypes} from "../../../../models/ITest";
import {Card, CheckBox, Divider, RadioButton} from "../../../../ui";
import style from '../Styles.module.scss'
import {IQuestionPassing} from "../PassingTestLayout/PassingTestLayout";

interface IQuestionBodyProps {
    question: IQuestionPassing;
    updateQuestions: () => void
}

export const QuestionBody: FC<IQuestionBodyProps> = memo(({question, updateQuestions}) => {

    const changeChecked = (e: React.ChangeEvent<HTMLInputElement>, idAnswer: string) => {

        question.answers.map(answer => {
            if(answer.id === idAnswer) return answer.isRight = e.target.checked;
            if(e.target.type === 'radio') return answer.isRight = false;
        })

        question.isComplete = !!question.answers.find(answer => answer.isRight === true);

        updateQuestions();
    }

    const AnswerTypeSwitcher = () => useMemo<JSX.Element>(() => {
        switch (question?.type){
            case QuestionTypes.ONE_CORRECT:{
                return (
                    <div className={style.answerBody}>
                        {question.answers?.map((answer) =>
                            <RadioButton
                                key={answer.id}
                                id={answer.id}
                                group={question.id}
                                label={answer.text}
                                checked={answer.isRight}
                                onChange={e => changeChecked(e, answer.id)}
                            />
                        )}
                    </div>
                )
            }
            case QuestionTypes.MANY_CORRECT:{
                return (
                    <div className={style.answerBody}>
                        {question.answers?.map((answer) =>
                            <CheckBox
                                key={answer.id}
                                id={answer.id}
                                label={answer.text}
                                checked={answer.isRight}
                                onChange={e => changeChecked(e, answer.id)}
                            />
                        )}
                    </div>
                )
            }
            default: {
                return <></>
            }
        }
    }, [])

    return(
        <div className={style.body}>
            <div className={style.questionWrapper}>
                <Card width={600}>
                    <div className={style.card}>
                        <div>
                            <span>{question?.title}</span>
                        </div>
                        <Divider/>
                        <AnswerTypeSwitcher/>
                    </div>
                </Card>
            </div>
        </div>
    )
});
