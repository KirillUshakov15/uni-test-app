import React, {FC} from 'react';
import {Sidebar} from "../../../ui";
import useAction, {useTypedSelector} from "../../../hooks/redux";
import {Modals} from "../../../ui/Modal";
import {useNavigate} from "react-router-dom";
import {EDIT_UNIVERSITIES_PAGE_ROUTE, EDIT_USERS_ACCESS_PAGE_ROUTE} from "../../../constants/routes";

export const AdminProfileMenu: FC = () => {
    const navigate = useNavigate();
    const {userData} = useTypedSelector(state => state.auth);
    const {openModal} = useAction();

    const redirectToEditUsersPage = () => {
        navigate(EDIT_USERS_ACCESS_PAGE_ROUTE)
    }

    const redirectToEditUniversitiesPage = () => {
        navigate(EDIT_UNIVERSITIES_PAGE_ROUTE)
    }

    const openLogoutModal = () => {
        openModal(Modals.LOGOUT_CONFIRM)
    }

    return (
        <Sidebar userData={userData}>
            <Sidebar.Item onClick={redirectToEditUsersPage}>Управление пользователями</Sidebar.Item>
            <Sidebar.Item onClick={redirectToEditUniversitiesPage}>Управление уч. заведениями</Sidebar.Item>
            <Sidebar.Item onClick={openLogoutModal}>Выход</Sidebar.Item>
        </Sidebar>
    );
};