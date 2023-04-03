import React, {FC, useCallback} from 'react';
import {Button} from "../../ui";
import style from './Pagination.module.scss'

interface IPaginationProps {
    pageNumbers: number[],
    onChangePage: (pageNumber: number) => void,
    currentPage: number;
}

export const Pagination: FC<IPaginationProps> = ({pageNumbers,onChangePage, currentPage}) => {

    const changePage = (pageNumber: number) => {
        onChangePage(pageNumber);
    }

    const previousPage = () => {
        changePage(currentPage - 1)
    }

    const nextPage = () => {
        changePage(currentPage + 1)
    }

    return (
        <div className={style.buttons}>
            {pageNumbers.length > 1 &&
                <>
                    <Button onClick={previousPage}>{"<"}</Button>
                    {pageNumbers.map((number) =>
                        <Button
                            key={number}
                            onClick={() => changePage(number)}
                            className={number === currentPage ? style.pressed : undefined}
                        >
                            {number}
                        </Button>
                    )}
                    <Button onClick={nextPage}>{">"}</Button>
                </>
            }
        </div>
    );
};
