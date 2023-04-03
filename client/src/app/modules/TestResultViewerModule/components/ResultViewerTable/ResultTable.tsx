import React, {FC} from 'react';
import {ITestResult} from "../../../../models/ITestResult";
import {Loader} from "../../../../ui";
import {StudentResultViewerTable} from "./StudentResultViewerTable";
import {TeacherResultViewerTable} from "./TeacherResultViewerTable";
import {Roles} from "../../../../models/IUser";

interface ITableProps {
    userRole: string,
    testsResult: ITestResult[]
    isLoading: boolean;
}

export const ResultTable: FC<ITableProps> = ({testsResult, isLoading, userRole}) => {

    if(isLoading){
        return (
            <Loader title="Загрузка..."/>
        )
    }

    if(testsResult && testsResult.length <= 0 && !isLoading) {
        return (
            <h2>По Вашему запросу ничего не найдено</h2>
        )
    }
    
    return (
        <>
            {userRole === Roles.TEACHER
                ? <TeacherResultViewerTable testsResult={testsResult}/>
                : <StudentResultViewerTable testsResult={testsResult}/>
            }
        </>
    );
};