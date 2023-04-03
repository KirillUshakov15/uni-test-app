import React, {FC, memo, useEffect, useState} from 'react';
import {Button, Divider, Form, Input} from "../../../../ui";
import style from '../FormStyle.module.scss'
import {useChangePasswordMutation} from "../../../../services/user-service";
import useAction from "../../../../hooks/redux";
import {isCorrectPassword, isRequiredField} from "../../../../utils/validation-templates";

interface IChangePassword {
    oldPassword: string,
    password: string,
    confirmPassword: string;
}

export const ChangePasswordForm: FC = memo(() => {

    const initialState = {
        oldPassword: '',
        password: '',
        confirmPassword: ''
    }

    const [passwordData, setPasswordData] = useState<IChangePassword>(initialState);
    const [changePassword, {isLoading, isSuccess}] = useChangePasswordMutation();

    const {closeModal} = useAction();

    useEffect(() => {
        if(isSuccess){
            closeModal();
        }
    }, [isSuccess])

    const submit = () => {
        changePassword(passwordData)
    }

    return (
        <Form onFinish={submit}>
            <div className={style.changePasswordFormWrapper}>
                <Form.Validator rules={[isRequiredField]}>
                    <Input.Password
                        placeholder="Введите старый пароль..."
                        value={passwordData.oldPassword}
                        onChange={e => setPasswordData({...passwordData, oldPassword: e.target.value})}
                    />
                </Form.Validator>

                <Divider/>

                <Form.Validator rules={[...isCorrectPassword]}>
                    <Input.Password
                        placeholder="Придумайте новый пароль..."
                        value={passwordData.password}
                        onChange={e => setPasswordData({...passwordData, password: e.target.value})}
                    />
                </Form.Validator>

                <Form.Validator rules={[isRequiredField]}>
                    <Input.Password
                        placeholder="Повторите новый пароль..."
                        value={passwordData.confirmPassword}
                        onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    />
                </Form.Validator>

                <Button type="submit" loading={isLoading}>Изменить пароль</Button>
            </div>
        </Form>
    );
});