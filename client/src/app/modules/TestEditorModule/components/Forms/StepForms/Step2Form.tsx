import React, {FC, memo, useContext} from 'react';
import style from './StepForms.module.scss'
import {Question} from "../../Question";
import {QuestionTypes} from "../../../../../models/ITest";
import { v4 as uuidv4 } from 'uuid';
import {CreateTestDataContext} from "../../TestEditorLayout";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const Step2Form: FC = memo(() => {
    const {data, setData} = useContext(CreateTestDataContext);

    const createQuestion = (questionType: QuestionTypes) => {
        setData({...data, questions: [...data.questions, {id: uuidv4(), type: questionType, title: '', answers: []}]})
    }

    return (
        <div>
            <div className={style.sideMenu}>
                <div className={style.sideMenuTitle}>
                    <FontAwesomeIcon icon={faPlus}/>
                    <span>Добавить вопрос</span>
                </div>
                <ul onClick={() => createQuestion(QuestionTypes.ONE_CORRECT)}>Один верный ответ</ul>
                <ul onClick={() => createQuestion(QuestionTypes.MANY_CORRECT)}>Несколько верных ответов</ul>
            </div>
            <div className={style.body}>
                <div className={style.questionsBody}>
                    {data.questions.map(({id, type}, index) =>
                        <Question
                            key={id}
                            titleNumber={index + 1}
                            idQuestion={id}
                            type={type}
                        />
                    )}
                </div>
            </div>
        </div>
    );
});

export default Step2Form;