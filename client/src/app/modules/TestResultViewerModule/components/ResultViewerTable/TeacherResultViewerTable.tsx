import React, {FC, memo} from 'react';
import {ITestResult} from "../../../../models/ITestResult";
import {Table} from "../../../../ui";
import {teacherTableColumns} from "./table-columns";

interface ITableProps {
    testsResult: ITestResult[]
}

export const TeacherResultViewerTable: FC<ITableProps> = memo(({testsResult}) => {
    return (
        <>
            <Table columns={teacherTableColumns}>
                {testsResult && testsResult.map(testResult =>
                    <Table.Row key={testResult.id}>
                        <Table.Cell>{testResult.test.name}</Table.Cell>
                        <Table.Cell>
                            {testResult.user.secondName + " " +
                            testResult.user.firstName + " " +
                            testResult.user?.patronymic}
                        </Table.Cell>
                        <Table.Cell>{testResult.user.groupID}</Table.Cell>
                        <Table.Cell>{testResult.mark}</Table.Cell>
                        <Table.Cell>{`${testResult.percent}%`}</Table.Cell>
                        <Table.Cell>{testResult.date}</Table.Cell>
                    </Table.Row>
                )}
            </Table>
        </>
    );
});