import React, {FC} from 'react';
import style from './RadioButton.module.scss'

interface IRadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement>{
    id: string;
    group: string;
    label?: string;
}

export const RadioButton: FC<IRadioButtonProps> =
    ({
         id,
         group,
         label,
        ...props
    }) => {
    return (
        <div className={style.wrapper}>
            <input
                className={style.checkField}
                type="radio"
                id={id}
                name={group}
                {...props}
            />
            <label
                className={style.textField}
                htmlFor={id}
            >
                {label}
            </label>
        </div>
    )
}