import React, {FC} from 'react';
import style from './Slider.module.scss'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    label?: string
}

export const Slider: FC<InputProps> = ({label, ...props}) => {
    return (
            <label>
                {label}
                <input className={style.slider} type="range" {...props}/>
            </label>
    );
};
