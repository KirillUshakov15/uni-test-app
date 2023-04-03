import React, {FC, memo, useEffect, useState} from 'react';
import style from '../Styles.module.scss'
import {Button, Loader} from "../../../../ui";
import {useNavigate, useParams} from "react-router-dom";
import {useCalculateResultMutation, useFetchTestForPassingQuery} from "../../../../services/test-service";
import {IQuestion, ITest} from "../../../../models/ITest";
import shuffleElements from "../../utils/shuffle-elements";
import {QuestionBody} from "../QuestionBody";
import {AVAILABLE_TESTS_PAGE_ROUTE, TEST_RESULT_PAGE_ROUTE} from "../../../../constants/routes";
import useNavigation from "../../hooks/useNavigation";
import {ConfirmModal} from "../ConfirmModal";
import useAction from "../../../../hooks/redux";
import {Modals} from "../../../../ui/Modal";
import checkAnswersStatus from "../../utils/check-answers-status";
import deepCopy from "../../../../utils/deep-copy";
import {CountDownTimer} from "../CountDownTimer/CountDownTimer";

export interface IQuestionPassing extends IQuestion{
    isComplete: boolean
}

export const PassingTestLayout: FC = memo(() => {
    const {id} = useParams();
    const {openModal} = useAction();
    const navigate = useNavigate();

    const [questions, setQuestions] = useState<IQuestionPassing[]>([])
    const [answersStatus, setAnswersStatus] = useState<string[]>([])

    const {data: testData = {} as ITest,
        isLoading: isTestDataLoading,
        isError,
        isSuccess: isTestDataSuccessLoaded} = useFetchTestForPassingQuery(id!);

    const [calculateResult, {
        isLoading: isCalculateResultLoading,
        isSuccess: isTestResultSuccessSubmitted}] = useCalculateResultMutation();

    const {NavigationPanel, goingBack, goingForward, currentQuestionIndex} = useNavigation(questions)

    /*useEffect(() => {
        console.log(questions)
    }, [questions])*/

    useEffect(() => {
        if(isTestResultSuccessSubmitted){
            navigate('/result/' + testData.id)
        }
    }, [isCalculateResultLoading]);

    useEffect(() => {
        if(isError){
            navigate(AVAILABLE_TESTS_PAGE_ROUTE)
        }
    }, [isError]);

    useEffect(() => {
        if(isTestDataSuccessLoaded){
            setQuestions(shuffleElements(deepCopy(testData.questions)));
        }
    }, [isTestDataSuccessLoaded]);

    const updateQuestionsState = () => {
        setQuestions([...questions])
    }

    const submitResult = () => {
        setAnswersStatus(checkAnswersStatus(questions))
        openModal(Modals.CONFIRM_END_OF_TEST)
    }

    const endOfTesting = () => {
        calculateResult({id: testData.id, questions: [...questions]});
    }

    if(isTestDataLoading){
        return (
            <div className={style.loader}>
                <Loader title="Загрузка теста. Пожалуйста, подождите..." />
            </div>
        )
    }

    return (
        <div>
            <div className={style.header}>
                <span>{testData.name}</span>
                {testData.timeForPass > 0 && <CountDownTimer minutesCount={testData.timeForPass} onFinish={endOfTesting}/>}
                <span>{`Вопрос ${currentQuestionIndex + 1} из ${testData.questions?.length}`}</span>
            </div>

            <div className={style.bodyLayout}>
                <QuestionBody
                    question={questions[currentQuestionIndex]}
                    updateQuestions={updateQuestionsState}
                />
               <NavigationPanel/>
            </div>

            <div className={style.footer}>
                <Button onClick={goingBack}>Предыдущий вопрос</Button>
                <Button onClick={submitResult} loading={isCalculateResultLoading}>Завершить тестирование</Button>
                <Button onClick={goingForward}>Следующий вопрос</Button>
            </div>

            <ConfirmModal onEnding={endOfTesting} answersStatus={answersStatus}/>
        </div>
    );
});
