import React, {FC, memo, useEffect, useState} from 'react';
import {ViewTestTable} from "../ViewTestTable";
import {useTypedSelector} from "../../../../hooks/redux";
import {useFetchTestsQuery} from "../../../../services/test-service";
import useSearch from "../../../../hooks/useSearch";
import {useFetchGroupsQuery} from "../../../../services/university-service";
import style from '../Style.module.scss'
import {ITestsPagination} from "../../../../models/ITest";
import usePagination from "../../../../hooks/usePagination";
import {TeacherFilterControls} from "../TeacherFilterControls";
import {Roles} from "../../../../models/IUser";
import {StudentFilterControls} from "../StudentFilterControls";
import {IGroup} from "../../../../models/IUniversity";
import useFilter from "../../../../hooks/useFilter";

export const ViewTestLayout: FC = memo(() => {
    const {userData} = useTypedSelector(state => state.auth);

    const isTeacherProfile = userData.role === Roles.TEACHER;

    const {searchValue, handleSearch} = useSearch();

    const {limit, setLimit, group, setGroup, timeForPass, setTime} = useFilter()

    const [page, setPage] = useState(1);

    const teacherQueryParams = {
        author: userData.id,
        search: searchValue,
        group: group,
        page: page,
        limit: limit,
        time: timeForPass
    }

    const studentQueryParams = {
        student: userData.id,
        search: searchValue,
        group: userData.groupID,
        page: page,
        limit: limit,
    }

    const {data: tests = {} as ITestsPagination, isFetching} = useFetchTestsQuery(
    isTeacherProfile
        ? teacherQueryParams
        : studentQueryParams
    );
    const {data: groups = [] as IGroup[]} = useFetchGroupsQuery(userData.universityID!, {skip: !isTeacherProfile});

    const {Paginator, currentPage} = usePagination(tests.count, limit);

    useEffect(() => {
        setPage(currentPage)
    }, [currentPage])

    return (
        <div className={style.wrapper}>
            <h3>{isTeacherProfile ? "Мои тесты" : "Доступные тесты"}</h3>

            {isTeacherProfile ?
                <TeacherFilterControls
                    groups={groups}
                    timeForPass={timeForPass}
                    setGroup={setGroup}
                    setLimit={setLimit}
                    setTime={setTime}
                    handleSearch={handleSearch}
                />
                :
                <StudentFilterControls
                    setLimit={setLimit}
                    handleSearch={handleSearch}
                />
            }

            <div className={style.tableContainer}>
                <ViewTestTable
                    isTeacherProfile={isTeacherProfile}
                    tests={tests.rows}
                    isLoading={isFetching}
                />
            </div>

            <Paginator/>
        </div>
    );
});