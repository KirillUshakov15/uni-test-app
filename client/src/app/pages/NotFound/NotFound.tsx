import React, {FC} from 'react';
import {Button} from "../../ui";
import {useNavigate} from "react-router-dom";
import {HOME_PAGE_ROUTE} from "../../constants/routes";
import style from './Styles.module.scss'

export const NotFound: FC = () => {

    const navigate = useNavigate()

    const redirectToHomePage = () => {
        navigate(HOME_PAGE_ROUTE)
    }

    return (
        <div className={style.wrapper}>
            <div>
                <h1>404</h1>
                <h2>Ничего не найдено</h2>
                <p>Запрашиваема Вами страница не найдена</p>
                <div className={style.buttonContainer}>
                    <Button onClick={redirectToHomePage}>Вернуться на главную</Button>
                </div>
            </div>
        </div>
    );
};
