import React, {FC, memo} from 'react';
import style from './Navbar.module.scss'
import {Link, NavLink, useNavigate} from "react-router-dom";
import {HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE, REGISTRATION_PAGE_ROUTE} from "../../constants/routes";
import appLogo from '../../assets/uni-test-logo.png'
import {Menu} from "../Menu";
import {LogoutModal} from "./Modal/LogoutModal";
import {useTypedSelector} from "../../hooks/redux";

export const Navbar: FC = memo(() => {
    const navigate = useNavigate();
    const {isAuth, userData} = useTypedSelector(state => state.auth)

    const redirectToLoginPage = () => {
        navigate(LOGIN_PAGE_ROUTE)
    }

    const redirectToRegistrationPage = () => {
        navigate(REGISTRATION_PAGE_ROUTE)
    }

    return (
        <div className={style.navbar}>
            <NavLink to={HOME_PAGE_ROUTE}>
                <img className={style.logo} src={appLogo} alt='uni-test-logo'/>
            </NavLink>

            <div className={style.navContainer}>
                <Link className={style.Link} to={'/'}>Студентам</Link>
                <Link className={style.Link} to={'/'}>Преподавателям</Link>
                <Link className={style.Link} to={'/'}>Правила пользования</Link>
                <Link className={style.Link} to={'/'}>О нас</Link>
            </div>

            <div className={style.authContainer}>
                {isAuth
                    ? <Menu role={userData.role}/>
                    :
                    <>
                        <span onClick={redirectToLoginPage}>Вход</span>
                        <span onClick={redirectToRegistrationPage}>Регистрация</span>
                    </>
                }
            </div>
            <LogoutModal/>
        </div>
    );
});
