import React, {FC, useEffect, useRef} from 'react';
import style from './Alert.module.scss'
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import useAction, {useTypedSelector} from "../../hooks/redux";

export const Alert: FC = () => {
    const {isShow, title} = useTypedSelector(state => state.popup.alert);
    const {closeAlert} = useAction();
    const timeout = useRef<NodeJS.Timeout>()

    useEffect(() => {
        if(isShow){
            timeout.current = setTimeout(closeAlert, 5000);
        }
        return () => clearTimeout(timeout.current);
    }, [isShow])

    return (
        <div className={isShow ? `${style.alert} ${style.alertShow}` : style.alert}>
            <div className={style.alertBody}>
                <FontAwesomeIcon className={style.icon} icon={faCircleInfo}/>
                <p>{title}</p>
                <span className={style.closeBtn} onClick={closeAlert}>X</span>
            </div>
        </div>
    );
};
