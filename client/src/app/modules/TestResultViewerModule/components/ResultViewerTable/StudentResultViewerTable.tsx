import React, {FC, memo} from 'react';
import {Button, Table} from "../../../../ui";
import {ITestResult} from "../../../../models/ITestResult";
import {useNavigate} from "react-router-dom";
import {studentTableColumns} from "./table-columns";

interface ITableProps {
    testsResult: ITestResult[]
}

export const StudentResultViewerTable: FC<ITableProps> = memo(({testsResult}) => {
    const navigate = useNavigate()

    const openResultPage = (testID: number) => {
        navigate('/result/' + testID)
    }

    return (
        <>
            <Table columns={studentTableColumns}>
                {testsResult && testsResult.map(testResult =>
                    <Table.Row key={testResult.id}>
                        <Table.Cell>{testResult.test.name}</Table.Cell>
                        <Table.Cell>{testResult.mark}</Table.Cell>
                        <Table.Cell>{`${testResult.percent}%`}</Table.Cell>
                        <Table.Cell>{testResult.date}</Table.Cell>
                        <Table.Cell>
                            <Button onClick={() => openResultPage(testResult.test.id)}>Подробнее...</Button>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table>
        </>
    );
});
