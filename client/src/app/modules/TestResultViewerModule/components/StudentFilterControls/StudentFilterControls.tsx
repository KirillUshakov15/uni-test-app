import React, {FC, memo} from 'react';
import {SelectLimit} from "../../../../components/SelectLimit";
import {SearchInput} from "../../../../components/SearchInput";
import style from "../Style.module.scss";
import {SelectMark} from "../SelectMark";

interface IStudentFilterControlsProps {
    setLimit: (value: number) => void,
    setMark: (mark: string) => void,
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const StudentFilterControls: FC<IStudentFilterControlsProps> = memo(({
    setLimit,
    handleSearch,
    setMark
                                                                       }) => {
    return (
        <div className={style.filterControlsContainer}>
            <div>
                <SelectLimit setLimit={setLimit}/>
                <SelectMark setMark={setMark}/>
            </div>
            <SearchInput handleSearch={handleSearch}/>
        </div>
    );
});
