import React, {FC} from 'react';
import {Loader} from "../../ui";
import style from './Style.module.scss'

export const PageLoader: FC = () => {
    return (
        <div className={style.pageLoader}>
            <Loader title="Загрузка содержимого страницы..."/>
        </div>
    );
};
