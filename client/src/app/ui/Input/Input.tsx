import React, {FC, useState} from 'react';
import style from './Input.module.scss'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-regular-svg-icons'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

interface InputExtensions {
    Password: typeof InputPassword
}

export const Input: FC<InputProps> & InputExtensions = ({...props}) => {
    return (
        <input className={style.inputStyle} {...props}/>
    );
};

const InputPassword: FC<InputProps> = ({...props}) => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        setVisible(prevState => !prevState);
    }

    return (
        <div className={style.passwordContainer}>
            <Input type={visible ? "text" : "password"} {...props} />
            <FontAwesomeIcon
                className={style.inputPasswordIcon}
                onClick={toggleVisible}
                icon={visible ? faEyeSlash : faEye}
            />
        </div>
    );
}

Input.Password = InputPassword;