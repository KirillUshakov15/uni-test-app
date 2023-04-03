import React, {FC} from 'react';
import {Sidebar} from "../../../ui";
import {useNavigate} from "react-router-dom";
import {
    HOME_PAGE_ROUTE,
    PROFILE_PAGE_ROUTE,
    TEACHER_TESTS_PAGE_ROUTE,
    TEST_CREATE_PAGE_ROUTE,
    TESTS_RESULT_PAGE_ROUTE
} from "../../../constants/routes";
import {Modals} from "../../../ui/Modal";
import useAction, {useTypedSelector} from "../../../hooks/redux";

export const TeacherProfileMenu: FC = () => {
    const {userData} = useTypedSelector(state => state.auth);
    const navigate = useNavigate();
    const {openModal} = useAction();

    const redirectToProfilePage = () => {
        navigate(PROFILE_PAGE_ROUTE)
    }

    const redirectToCreateTestPage = () => {
        navigate(TEST_CREATE_PAGE_ROUTE);
    }

    const redirectToTeacherTestsPage = () => {
        navigate(TEACHER_TESTS_PAGE_ROUTE)
    }

    const redirectToTestsResultPage = () => {
        navigate(TESTS_RESULT_PAGE_ROUTE)
    }

    const openLogoutModal = () => {
        openModal(Modals.LOGOUT_CONFIRM)
    }

    return (
        <Sidebar userData={userData} >
            <Sidebar.Item onClick={redirectToProfilePage}>Мой профиль</Sidebar.Item>
            <Sidebar.Item onClick={redirectToCreateTestPage}>Новый тест</Sidebar.Item>
            <Sidebar.Item onClick={redirectToTeacherTestsPage}>Мои тесты</Sidebar.Item>
            <Sidebar.Item onClick={redirectToTestsResultPage}>Результаты тестирований</Sidebar.Item>
            <Sidebar.Item onClick={openLogoutModal}>Выход</Sidebar.Item>
        </Sidebar>
    );
};