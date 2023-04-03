import React, {FC} from 'react';
import style from './CheckBox.module.scss'

interface ICheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement>{
    id: string;
    label?: string;
}

export const CheckBox: FC<ICheckBoxProps> = ({id, label, ...props}) => {
    return (
        <div className={style.wrapper}>
            <input
                className={style.checkField}
                type="checkbox"
                id={id}
                {...props}
            />
            <label
                className={style.textField}
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    );
};
