import React, {FC, useEffect, useState} from 'react';
import {ResultTable} from "../ResultViewerTable";
import {useGetTestsResultQuery} from "../../../../services/test-service";
import {useTypedSelector} from "../../../../hooks/redux";
import {ITestResultPagination, Marks} from "../../../../models/ITestResult";
import style from '../Style.module.scss'
import useSearch from "../../../../hooks/useSearch";
import {Roles} from "../../../../models/IUser";
import usePagination from "../../../../hooks/usePagination";
import {StudentFilterControls} from "../StudentFilterControls";
import {TeacherFilterControls} from "../TeacherFilterControls";
import {useFetchGroupsQuery} from "../../../../services/university-service";
import {IGroup} from "../../../../models/IUniversity";
import useFilter from "../../../../hooks/useFilter";

export const ResultViewerLayout: FC = () => {
    const {userData} = useTypedSelector(state => state.auth)
    const isTeacherProfile = userData.role === Roles.TEACHER;

    const {searchValue, handleSearch} = useSearch();
    const [page, setPage] = useState(1);

    const {mark, setMark, limit, setLimit, group, setGroup} = useFilter();

    const queryParams = {
        limit: limit,
        page: page,
        mark: mark,
        search: searchValue
    }

    const studentQueryParams = {
        ...queryParams,
        student: userData.id,
    }

    const teacherQueryParams = {
        ...queryParams,
        author: userData.id,
        group: group
    }

    const {data: testsResult = {} as ITestResultPagination, isFetching} = useGetTestsResultQuery(
        isTeacherProfile
            ? teacherQueryParams
            : studentQueryParams
    );

    const {data: groups = [] as IGroup[]} = useFetchGroupsQuery(userData.universityID!, {skip: !isTeacherProfile});

    const {Paginator, currentPage} = usePagination(testsResult.count, limit);

    useEffect(() => {
        setPage(currentPage)
    }, [currentPage])

    return (
        <div className={style.wrapper}>
            <h3>Результаты тестирования</h3>
            <div>
                {isTeacherProfile ?
                    <TeacherFilterControls
                        handleSearch={handleSearch}
                        setLimit={setLimit}
                        setMark={setMark}
                        groups={groups}
                        setGroup={setGroup}
                    />
                    :
                    <StudentFilterControls
                        setLimit={setLimit}
                        handleSearch={handleSearch}
                        setMark={setMark}
                    />
                }
            </div>

            <div className={style.tableContainer}>
                <ResultTable testsResult={testsResult.rows} isLoading={isFetching} userRole={userData.role}/>
            </div>

            <Paginator/>
        </div>
    );
};
