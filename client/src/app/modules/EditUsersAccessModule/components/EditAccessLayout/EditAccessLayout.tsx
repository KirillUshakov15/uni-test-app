import React, {FC, useEffect, useState} from 'react';
import {useFetchUsersQuery} from "../../../../services/user-service";
import {UsersTable} from "../UsersTable";
import {IUserPagination} from "../../../../models/IUser";
import style from '../Style.module.scss'
import usePagination from "../../../../hooks/usePagination";
import {FilterControls} from "../FilterControls";
import useSearch from "../../../../hooks/useSearch";
import {IUniversity} from "../../../../models/IUniversity";
import {useFetchUniversitiesQuery} from "../../../../services/university-service";
import useFilter from "../../../../hooks/useFilter";

export const EditAccessLayout: FC = () => {

    const [page, setPage] = useState(1);
    const {searchValue, handleSearch} = useSearch();

    const {limit, setLimit, university, setUniversity, hasAccess, setHasAccess, role, setRole} = useFilter()

    const queryParams = {
        limit: limit,
        page: page,
        search: searchValue,
        university: university,
        role: role,
        hasAccess: hasAccess
    }

    const {data: users = {} as IUserPagination, isFetching} = useFetchUsersQuery(queryParams);
    const {data: universities = [] as IUniversity[]} = useFetchUniversitiesQuery('');

    const {Paginator, currentPage} = usePagination(users.count, limit);

    useEffect(() => {
        setPage(currentPage)
    }, [currentPage])

    return (
        <div>
            <div>
                <FilterControls
                    setLimit={setLimit}
                    setUniversity={setUniversity}
                    setRole={setRole}
                    setHasAccess={setHasAccess}
                    handleSearch={handleSearch}
                    universities={universities}
                />
            </div>
            <div className={style.tableContainer}>
                <UsersTable users={users.rows} isLoading={isFetching}/>
            </div>

            <Paginator/>
        </div>

    );
};
