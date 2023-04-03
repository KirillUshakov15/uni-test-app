import React, {FC, Suspense } from 'react';
import {Route, Routes} from "react-router-dom";
import {adminRoutes, publicRoutes, studentRoutes, teacherRoutes} from "./routes";
import {useTypedSelector} from "../../hooks/redux";
import {Roles} from "../../models/IUser";
import {PageLoader} from "../PageLoader";

export const AppRouter: FC = () => {
    const {userData} = useTypedSelector(state => state.auth)

    return (
        <Suspense fallback={<PageLoader/>}>
            <Routes>
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} />
                )}
                {userData?.role === Roles.TEACHER && teacherRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} />
                )}
                {userData?.role === Roles.STUDENT && studentRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} />
                )}
                {userData?.role === Roles.ADMIN && adminRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={<Component/>} />
                )}
            </Routes>
        </Suspense>
    );
};