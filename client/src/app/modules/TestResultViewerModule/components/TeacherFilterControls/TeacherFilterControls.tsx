import React, {FC, memo} from 'react';
import style from "../Style.module.scss";
import {Input, Select, Slider} from "../../../../ui";
import {IGroup} from "../../../../models/IUniversity";
import {SearchInput} from "../../../../components/SearchInput";
import {SelectLimit} from "../../../../components/SelectLimit";
import {SelectMark} from "../SelectMark";

interface ITeacherFilterControlsProps {
    groups: IGroup[],
    setGroup: (value: number) => void,
    setLimit: (value: number) => void,
    setMark: (mark: string) => void,
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TeacherFilterControls: FC<ITeacherFilterControlsProps> = memo(({
    setLimit,
    setMark,
    handleSearch,
    groups,
    setGroup
                                                                       }) => {

    return (
        <div className={style.filterControlsContainer}>
            <div className={style.selectContainer}>

                <SelectLimit setLimit={setLimit}/>

                <Select onChange={e => setGroup(parseInt(e.target.value))}>
                    <option value={''}>Все группы</option>
                    {groups.map(group =>
                        <option value={group.id} key={group.id}>{group.name}</option>
                    )}
                </Select>

                <SelectMark setMark={setMark}/>
            </div>
            <SearchInput handleSearch={handleSearch}/>
        </div>
    );
});
