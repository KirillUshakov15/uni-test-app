import React, {FC, ReactNode} from 'react';
import style from './Layout.module.scss'
import {Navbar} from "../Navbar";
import {Alert} from "../../ui";

interface ILayoutProps {
    children: ReactNode
}

export const Layout: FC<ILayoutProps> = ({children}) => {
    return (
        <>
            <header className={style.header}>
                <Alert/>
                <Navbar/>
            </header>
            <div className={style.content}>
                {children}
            </div>
        </>

    );
};