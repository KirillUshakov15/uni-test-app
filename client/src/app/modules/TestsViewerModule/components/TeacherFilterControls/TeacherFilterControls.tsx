import React, {FC, memo} from 'react';
import style from "../Style.module.scss";
import {Input, Select, Slider} from "../../../../ui";
import {IGroup} from "../../../../models/IUniversity";
import {ITestCreate} from "../../../../models/ITestCreate";
import {SearchInput} from "../../../../components/SearchInput";
import {SelectLimit} from "../../../../components/SelectLimit";

interface ITeacherFilterControlsProps {
    groups: IGroup[],
    timeForPass: number,
    setGroup: (value: number) => void,
    setLimit: (value: number) => void,
    setTime: (value: number) => void,
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TeacherFilterControls: FC<ITeacherFilterControlsProps> = memo(({
    groups,
    timeForPass,
    setGroup,
    setLimit,
    setTime,
    handleSearch
                                                                       }) => {

    return (
        <div className={style.filterControlsContainer}>
            <div className={style.selectContainer}>

                <Select onChange={e => setGroup(parseInt(e.target.value))}>
                    <option>Все группы</option>
                    {groups.map(group =>
                        <option value={group.id} key={group.id}>{group.name}</option>
                    )}
                </Select>

                <SelectLimit setLimit={setLimit}/>
            </div>

            <div className={style.searchContainer}>
                <SearchInput handleSearch={handleSearch}/>
                <Slider
                    value={timeForPass}
                    name="normal-mark-slider"
                    max={120}
                    step={5}
                    onChange={e => setTime(parseInt(e.target.value))}
                    label={timeForPass > 0
                        ? `Время на выполнение: ${timeForPass} мин и больше`
                        : `Без учета времени`
                    }
                />
            </div>
        </div>
    );
});
