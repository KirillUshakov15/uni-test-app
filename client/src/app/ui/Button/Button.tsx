import React, {FC} from 'react';
import './Button.module.scss'
import {Loader} from "../Loader";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode,
    loading?: boolean;
}

export const Button: FC<IButtonProps> =
    ({
         children,
         loading,
        ...props
    }) => {
    return (
        <button {...props} disabled={loading || props.disabled} >
            <div>
                {loading && <Loader/>}
                {children}
            </div>
        </button>
    );
};