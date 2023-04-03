import React, {useEffect, useMemo, useState} from "react";
import {Pagination} from "../components/Pagination";

export default function usePagination(totalCount: number, perPageCount: number){
    const firstPageNumber = 1;
    const [currentPage, setCurrentPage] = useState<number>(firstPageNumber);
    const [pageNumbers, setPageNumbers] = useState<number[]>([]);
    const totalPageCount = Math.ceil(totalCount / perPageCount);

    useEffect(() => {
        setCurrentPage(1);
        setPageNumbers([]);
        for(let i = 1; i <= totalPageCount; i++){
            setPageNumbers(prevState => [...prevState, i])
        }
    }, [totalCount, perPageCount]);

    const changePage = (pageNumber: number) => {
        if(pageNumber >= firstPageNumber && pageNumber <= totalPageCount){
            setCurrentPage(pageNumber)
        }
    }

    const Paginator = () => useMemo<JSX.Element>(() => {
        return (
            <Pagination
                pageNumbers={pageNumbers}
                currentPage={currentPage}
                onChangePage={changePage}
            />
        )
    }, [pageNumbers, currentPage])

    return {Paginator, currentPage}
}