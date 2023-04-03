import React, {FC} from 'react';
import style from './Divider.module.scss'

export const Divider: FC = () => {
    return (
        <hr className={style.divider}/>
    );
};
