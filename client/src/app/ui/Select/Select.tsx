import React, {ChangeEventHandler, FC, SelectHTMLAttributes} from 'react';
import style from './Select.module.scss'

interface ISelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>{
    label?: string;
    children: React.ReactNode;
}

export const Select: FC<ISelectProps> = ({
                                             label,
                                             children,
                                             ...props
}) => {
    return (
        <label className={style.title}>
            {label}
            <select className={style.selectContainer} {...props}>
                {children}
            </select>
        </label>
    );
};
