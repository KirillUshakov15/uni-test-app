import React, {FC} from 'react';
import {Select} from "../../ui";

interface IProps {
    setLimit: (value: number) => void,
}

export const SelectLimit: FC<IProps> = ({setLimit}) => {
    return (
        <Select onChange={e => setLimit(parseInt(e.target.value))} label="Отображать по:">
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={7}>7</option>
        </Select>
    );
};
