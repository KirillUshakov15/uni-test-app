import React from 'react';
import {Button, Modal} from "../../../../ui";
import {useNavigate} from "react-router-dom";
import {HOME_PAGE_ROUTE} from "../../../../constants/routes";
import {Modals} from "../../../../ui/Modal";
import useAction from "../../../../hooks/redux";

export const SuccessRegistrationModal = () => {
    const navigate = useNavigate();
    const {closeModal} = useAction();

    const redirectToHomePage = () => {
        navigate(HOME_PAGE_ROUTE)
        closeModal();
    }

    return (
        <Modal title="Регистрация прошла успешно" modalName={Modals.SUCCESS_REGISTRATION} closable={false}>
            <h3>Поздравляем, вы успешно зарегистрировались в системе UniTest.
                Понадобится некоторое время для того, чтобы администрация сервиса подтвердила Ваш аккаунт
                и предоставила доступ ко всему функционалу. Следите за новостями на своей электронной почте.
            </h3>
            <Button onClick={redirectToHomePage}>На главную</Button>
        </Modal>
    );
};
