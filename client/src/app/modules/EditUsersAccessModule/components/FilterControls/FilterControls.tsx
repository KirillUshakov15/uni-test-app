import React, {FC} from 'react';
import {SelectLimit} from "../../../../components/SelectLimit";
import style from '../Style.module.scss'
import {SearchInput} from "../../../../components/SearchInput";
import {Select} from "../../../../ui";
import {IUniversity} from "../../../../models/IUniversity";
import {Roles} from "../../../../models/IUser";

interface IProps {
    setLimit: (value: number) => void,
    setUniversity: (value: number) => void,
    setRole: (role: string) => void,
    setHasAccess: (value: string) => void,
    universities: IUniversity[],
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FilterControls: FC<IProps> = ({
                                               setLimit,
                                               handleSearch,
                                               universities,
                                               setUniversity,
                                               setRole,
                                               setHasAccess
}) => {
    return (
        <div className={style.filterControlsContainer}>
            <div className={style.selectContainer}>

                <SelectLimit setLimit={setLimit}/>

                <Select onChange={e => setUniversity(parseInt(e.target.value))}>
                    <option value={''}>Все учебные заведения</option>
                    {universities.map(university =>
                        <option value={university.id} key={university.id}>{university.name}</option>
                    )}
                </Select>

                <Select onChange={e => setRole(e.target.value)}>
                    <option value={''}>Все пользователи</option>
                    <option value={Roles.STUDENT}>Учащиеся</option>
                    <option value={Roles.TEACHER}>Преподаватели</option>
                </Select>

                <Select onChange={e => setHasAccess(e.target.value)}>
                    <option value={''}>Без учета доступа</option>
                    <option value={"true"}>С доступом в систему</option>
                    <option value={"false"}>Без доступа в систему</option>
                </Select>
            </div>
            <SearchInput handleSearch={handleSearch}/>
        </div>
    );
};
