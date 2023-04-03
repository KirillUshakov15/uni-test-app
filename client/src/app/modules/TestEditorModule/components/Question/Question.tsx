import React, {FC, memo, useContext, useEffect} from 'react';
import {Card, Input} from "../../../../ui";
import style from './Question.module.scss'
import {QuestionTypes} from "../../../../models/ITest";
import {Answer} from "../Answer";
import {CreateTestDataContext} from "../TestEditorLayout";
import {v4 as uuidv4} from 'uuid';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from '@fortawesome/free-solid-svg-icons'

interface IQuestionProps {
    idQuestion: string;
    type: QuestionTypes;
    titleNumber: number;
}

export const Question: FC<IQuestionProps> = memo(({idQuestion, type, titleNumber}) => {
    const {data, setData} = useContext(CreateTestDataContext)
    const currentQuestion = data.questions.find(question => question.id === idQuestion)

    const removeQuestion = () => {
        data.questions = data.questions.filter((question) => question.id !== idQuestion);
        setData({...data})
    }

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        data.questions.filter(el => el.id === currentQuestion?.id).map(question => {
           return question.title = e.target.value
        });
        setData({...data});
    };

    const addAnswer = () => {
        currentQuestion?.answers.push({id: uuidv4(), text: '', isRight: false});
        setData({...data});
    }

    return (
        <div className={style.wrapper}>
            <Card width={650}>
                <div className={style.questionHeader}>
                    <span>Вопрос №{titleNumber}</span>
                    <span className={style.closeBtn} onClick={removeQuestion}>X</span>
                </div>
                <Input
                    value={currentQuestion?.title || ''}
                    onChange={changeTitle}
                    placeholder="Сформулируйте вопрос..."
                />
                {type !== QuestionTypes.ENTER_DATA &&
                    <div className={style.addButton} onClick={addAnswer}>
                        <FontAwesomeIcon icon={faPlus}/>
                        <span>Добавить вариант ответа</span>
                    </div>
                }
                <div className={style.answer}>
                        {currentQuestion?.answers.map((answer, index) =>
                            <Answer
                                key={answer.id}
                                idAnswer={answer.id}
                                titleNumber={index + 1}
                                parentQuestion={currentQuestion}
                                type={type}
                            />
                        )}
                </div>
            </Card>
        </div>
    );
});

