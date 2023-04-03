import React, {FC} from 'react';
import style from "./Loader.module.scss";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface ILoaderProps {
    title?: string
}

export const Loader: FC<ILoaderProps> = ({title}) => {
    return (
        <div className={style.spinnerContainer}>
            <FontAwesomeIcon className={style.spinner} icon={faSpinner}/>
            <span>{title}</span>
        </div>
    );
};
