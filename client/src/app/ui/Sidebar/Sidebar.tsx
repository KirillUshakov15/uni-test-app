import React, {createContext, FC, useContext, useState} from 'react';
import style from './Sidebar.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from '@fortawesome/free-regular-svg-icons'
import {faBars} from '@fortawesome/free-solid-svg-icons'
import {IUser, Roles} from "../../models/IUser";

interface ISidebarProps {
    children?: React.ReactNode;
    userData: IUser;
}

interface SidebarExtensions {
    Item: typeof SidebarItem
}

const OpenContext = createContext<React.Dispatch<React.SetStateAction<boolean>>>(() => null)

export const Sidebar: FC<ISidebarProps> & SidebarExtensions = ({children, userData}) => {
    const [isOpen, setOpen] = useState(false);

    const toggleSidebar = () => {
        setOpen(!isOpen)
    }

    return (
        <>
            <div className={style.profileButton} onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
                <span>Меню</span>
            </div>
            <div className={isOpen ? `${style.sidebarActive} ${style.sidebar}` : style.sidebar} onClick={toggleSidebar}>
                <div className={style.sidebarBody} onClick={e => e.stopPropagation()}>
                    <div className={style.sidebarTitle}>
                        <FontAwesomeIcon className={style.icon} icon={faUser} />
                        <div className={style.userContainer}>
                            {userData.role === Roles.ADMIN
                                ? <span>Администратор</span>
                                : <span>{userData.secondName} {userData.firstName}</span>
                            }
                            <span className={style.userRole}>{userData.role}</span>
                        </div>
                    </div>
                    <OpenContext.Provider value={setOpen}>
                        {children}
                    </OpenContext.Provider>
                </div>
            </div>
        </>
    );
};

interface ISidebarItemProps {
    children: string;
    onClick?: () => void;
}

const SidebarItem: FC<ISidebarItemProps> = ({children, onClick}) => {
    const setOpen = useContext(OpenContext)

    const clickSidebarItem = () => {
        setOpen(false)
        if (onClick) {
            onClick();
        }
    }

    return (
        <ul onClick={clickSidebarItem} className={style.menuItem}>{children}</ul>
    )
}

Sidebar.Item = SidebarItem