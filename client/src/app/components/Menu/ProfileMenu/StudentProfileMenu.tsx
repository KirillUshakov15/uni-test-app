import React, {FC} from 'react';
import {Sidebar} from "../../../ui";
import {useNavigate} from "react-router-dom";
import {Modals} from "../../../ui/Modal";
import useAction, {useTypedSelector} from "../../../hooks/redux";
import {AVAILABLE_TESTS_PAGE_ROUTE, PROFILE_PAGE_ROUTE, TESTS_RESULT_PAGE_ROUTE} from "../../../constants/routes";

export const StudentProfileMenu: FC = () => {
    const navigate = useNavigate();
    const {userData} = useTypedSelector(state => state.auth);
    const {openModal} = useAction();

    const redirectToProfilePage = () => {
        navigate(PROFILE_PAGE_ROUTE)
    }

    const redirectToAvailTestsRoute = () => {
        navigate(AVAILABLE_TESTS_PAGE_ROUTE)
    }

    const redirectToTestsResultPage = () => {
        navigate(TESTS_RESULT_PAGE_ROUTE)
    }

    const openLogoutModal = () => {
        openModal(Modals.LOGOUT_CONFIRM)
    }

    return (
        <Sidebar userData={userData}>
            <Sidebar.Item onClick={redirectToProfilePage}>Мой профиль</Sidebar.Item>
            <Sidebar.Item onClick={redirectToAvailTestsRoute}>Доступные тесты</Sidebar.Item>
            <Sidebar.Item onClick={redirectToTestsResultPage}>Результаты тестирования</Sidebar.Item>
            <Sidebar.Item onClick={openLogoutModal}>Выход</Sidebar.Item>
        </Sidebar>
    );
};