import React, {FC} from 'react';
import {Select} from "../../../../ui";
import {Marks} from "../../../../models/ITestResult";

interface IProps {
    setMark: (mark: string) => void,
}

export const SelectMark: FC<IProps> = ({setMark}) => {
    return (
        <Select onChange={e => setMark(e.target.value)}>
            <option value={''}>Все оценки</option>
            <option value={Marks.EXCELLENT}>Отлично</option>
            <option value={Marks.GOOD}>Хорошо</option>
            <option value={Marks.NORMAL}>Удовлетворительно</option>
            <option value={Marks.BAD}>Неудовлетворительно</option>
        </Select>
    );
};
