import React, {FC, memo, useEffect} from 'react';
import {ITestResult, Marks} from "../../../../models/ITestResult";
import {Button, Card, Loader} from "../../../../ui";
import {useNavigate, useParams} from "react-router-dom";
import {TESTS_RESULT_PAGE_ROUTE} from "../../../../constants/routes";
import {useGetTestResultQuery} from "../../../../services/test-service";
import style from "../../../PassingTestModule/components/Styles.module.scss";
import {useTypedSelector} from "../../../../hooks/redux";

export const TestResultForm: FC = memo(() => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {userData} = useTypedSelector(state => state.auth)

    const {data: testResult = {} as ITestResult, isLoading, isError} = useGetTestResultQuery({
        testID: parseInt(id!), student: userData.id
    })

    useEffect(() => {
        if(isError){
            navigate(TESTS_RESULT_PAGE_ROUTE)
        }
    }, [isError]);

    const redirectToResultPage = () => {
        navigate(TESTS_RESULT_PAGE_ROUTE)
    }

    if(isLoading){
        return (
            <div className={style.loader}>
                <Loader title="Загрузка результатов. Пожалуйста, подождите..."/>
            </div>
        )
    }

    return (
        <div className={style.wrapper}>
            <Card width={600}>
                <div className={style.dateContainer}>
                    <p>Дата прохождения: {testResult.date}</p>
                </div>
                <h3>{testResult.mark === Marks.BAD ? "Тест не пройден" : "Поздравляем! Тест пройден"}</h3>
                <p>{`Правильных ответов: ${testResult.receivedPoints} из ${testResult.totalPoints}`}</p>
                <p>{`Процент правильных ответов: ${testResult.percent}%`}</p>
                <p>{`Оценка: ${testResult.mark}`}</p>
                <Button onClick={redirectToResultPage}>К результатам</Button>
            </Card>
        </div>
    );
});