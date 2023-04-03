import React, {FC, memo} from 'react';
import {Button, Modal} from "../../../ui";
import {Modals} from "../../../ui/Modal";
import {LOGIN_PAGE_ROUTE} from "../../../constants/routes";
import {useNavigate} from "react-router-dom";
import style from './Style.module.scss'
import useAction from "../../../hooks/redux";
import {useLogoutMutation} from "../../../services/auth-service";

export const LogoutModal: FC = memo(() => {
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const {closeModal} = useAction();

    const logoutAccount = () => {
        logout('');
        navigate(LOGIN_PAGE_ROUTE);
        closeModal();
    }

    return (
        <Modal title="Подтверждение выхода" modalName={Modals.LOGOUT_CONFIRM}>
            <div className={style.wrapper}>
                <h3>Вы действительно хотите выйти?</h3>
                <div className={style.buttonsContainer}>
                    <Button onClick={logoutAccount}>Да</Button>
                    <Button onClick={closeModal}>Нет</Button>
                </div>
            </div>
        </Modal>
    );
});