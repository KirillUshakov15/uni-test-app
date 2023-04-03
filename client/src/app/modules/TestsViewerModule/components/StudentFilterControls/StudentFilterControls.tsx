import React, {FC, memo} from 'react';
import {SelectLimit} from "../../../../components/SelectLimit";
import {SearchInput} from "../../../../components/SearchInput";
import style from "../Style.module.scss";

interface IStudentFilterControlsProps {
    setLimit: (value: number) => void,
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const StudentFilterControls: FC<IStudentFilterControlsProps> = memo(({
    setLimit,
    handleSearch
                                                                       }) => {
    return (
        <div className={style.filterControlsContainer}>
            <SelectLimit setLimit={setLimit}/>
            <SearchInput handleSearch={handleSearch}/>
        </div>
    );
});
