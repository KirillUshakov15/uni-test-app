import React, {FC} from 'react';
import style from './Card.module.scss'

interface ICardProps{
    children: React.ReactNode
    width?: number
    height?: number
}

export const Card: FC<ICardProps> =
    ({
         children,
         width,
         height
    }) => {
    return (
        <div className={style.cardContainer} style={{width: width, height: height}}>
            {children}
        </div>
    );
};

