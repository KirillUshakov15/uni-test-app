import React, {FC} from 'react';
import {Input} from "../../ui";

interface IProps {
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchInput: FC<IProps> = ({handleSearch}) => {
    return (
        <Input placeholder="Поиск..." onChange={handleSearch} />
    );
};