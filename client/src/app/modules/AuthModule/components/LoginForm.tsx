import React, {FC, memo, useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {HOME_PAGE_ROUTE, REGISTRATION_PAGE_ROUTE} from "../../../constants/routes";
import {Button, Card, Form, Input} from '../../../ui';
import {useTypedSelector} from "../../../hooks/redux";
import {useLoginMutation} from "../../../services/auth-service";
import style from './Styles.module.scss'
import {isRequiredField} from "../../../utils/validation-templates";

export const LoginForm: FC = memo(() => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {isAuth} = useTypedSelector(state => state.auth);
    const [login, {isLoading}] = useLoginMutation();
    const navigate = useNavigate();

    const submit = () => {
        login({email, password});
    }

    useEffect(() => {
        if(isAuth){
            navigate(HOME_PAGE_ROUTE);
        }
    }, [isAuth]);

    return (
        <div className={style.wrapper}>
            <Card width={600}>
                <Form className={style.content} onFinish={submit}>
                    <h3>Авторизация</h3>

                    <Form.Validator name="email" rules={[isRequiredField]}>
                        <Input
                            placeholder="Введите email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Validator>

                    <Form.Validator name="password" rules={[isRequiredField]}>
                        <Input.Password
                            placeholder="Введите пароль..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Validator>

                    <p>Нет аккаунта? <Link to={REGISTRATION_PAGE_ROUTE}>Зарегистрируйтесь!</Link></p>

                    <Button type="submit" loading={isLoading}>Войти</Button>
                </Form>
            </Card>
        </div>

    );
});
