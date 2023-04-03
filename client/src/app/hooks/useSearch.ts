import React, {useCallback, useRef, useState} from 'react'

export default function useSearch(){
    const [searchValue, setSearchValue] = useState('');
    const timer = useRef<NodeJS.Timeout>();

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if(timer.current){
            clearTimeout(timer.current)
        }

        timer.current = setTimeout(() => {
            setSearchValue(e.target.value)
        }, 500)
    }, [searchValue]);

    return {
        searchValue,
        handleSearch
    }
}