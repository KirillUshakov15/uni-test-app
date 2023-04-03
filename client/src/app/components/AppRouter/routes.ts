import React, {FC} from "react";
import {
    AVAILABLE_TESTS_PAGE_ROUTE, EDIT_UNIVERSITIES_PAGE_ROUTE, EDIT_USERS_ACCESS_PAGE_ROUTE,
    HOME_PAGE_ROUTE,
    LOGIN_PAGE_ROUTE, PASSING_TEST_PAGE_ROUTE, PROFILE_PAGE_ROUTE,
    REGISTRATION_PAGE_ROUTE,
    TEACHER_TESTS_PAGE_ROUTE,
    TEST_CREATE_PAGE_ROUTE, TEST_EDIT_PAGE_ROUTE, TEST_RESULT_PAGE_ROUTE, TESTS_RESULT_PAGE_ROUTE
} from "../../constants/routes";
import {
    Home,
} from "../../pages/Home";

const TestEditor = React.lazy(() => import('../../pages/TestEditor'))
const Login = React.lazy(() => import('../../pages/Login'))
const NotFound = React.lazy(() => import('../../pages/NotFound'))
const Registration = React.lazy(() => import('../../pages/Registration'))
const TeacherTests = React.lazy(() => import('../../pages/TeacherTests'))
const Profile = React.lazy(() => import('../../pages/Profile'))
const AvailableTests = React.lazy(() => import('../../pages/AvailableTests'))
const PassingTest = React.lazy(() => import('../../pages/PassingTest'))
const TestResult = React.lazy(() => import('../../pages/TestResult'))
const TestsResult = React.lazy(() => import('../../pages/TestsResult'))
const EditUsersAccess = React.lazy(() => import('../../pages/EditUsersAccess'))
const EditUniversities = React.lazy(() => import('../../pages/EditUniversities'))

interface IRoute {
    path: string;
    Component: FC;
}

export const publicRoutes: IRoute[] = [
    {path: HOME_PAGE_ROUTE, Component: Home},
    {path: LOGIN_PAGE_ROUTE, Component: Login},
    {path: REGISTRATION_PAGE_ROUTE, Component: Registration},
    {path: '*', Component: NotFound}
]

export const teacherRoutes: IRoute[] = [
    {path: TEST_CREATE_PAGE_ROUTE, Component: TestEditor},
    {path: TEST_EDIT_PAGE_ROUTE, Component: TestEditor},
    {path: TEACHER_TESTS_PAGE_ROUTE, Component: TeacherTests},
    {path: PROFILE_PAGE_ROUTE, Component: Profile},
    {path: TESTS_RESULT_PAGE_ROUTE, Component: TestsResult},
]

export const studentRoutes: IRoute[] = [
    {path: PROFILE_PAGE_ROUTE, Component: Profile},
    {path: AVAILABLE_TESTS_PAGE_ROUTE, Component: AvailableTests},
    {path: PASSING_TEST_PAGE_ROUTE, Component: PassingTest},
    {path: TEST_RESULT_PAGE_ROUTE, Component: TestResult},
    {path: TESTS_RESULT_PAGE_ROUTE, Component: TestsResult},
]

export const adminRoutes: IRoute[] = [
    {path: EDIT_USERS_ACCESS_PAGE_ROUTE, Component: EditUsersAccess},
    {path: EDIT_UNIVERSITIES_PAGE_ROUTE, Component: EditUniversities}
]