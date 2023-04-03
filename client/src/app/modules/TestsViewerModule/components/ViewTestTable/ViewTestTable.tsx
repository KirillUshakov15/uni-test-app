import React, {FC, memo, useState} from 'react';
import {Button, Loader, Table} from "../../../../ui";
import {ITest} from "../../../../models/ITest";
import {useNavigate} from "react-router-dom";
import {studentTableColumns, teacherTableColumns} from "./table-сolumns";
import trimString from "../../../../utils/trim-string";
import {TestPreviewModal} from "../TestPreviewModal";
import {Modals} from "../../../../ui/Modal";
import useAction from "../../../../hooks/redux";

interface ITableProps {
    isTeacherProfile: boolean,
    tests: ITest[],
    isLoading: boolean
}

export const ViewTestTable: FC<ITableProps> = memo(({tests, isTeacherProfile, isLoading}) => {
    const [test, setTest] = useState<ITest>({} as ITest);
    const navigate = useNavigate();
    const {openModal} = useAction();

    const editTest = (id: number) => {
        navigate('/edit/' + id);
    }

    const openTestPreviewModal = (selectedTest: ITest) => {
        setTest(selectedTest)
        openModal(Modals.TEST_PREVIEW);
    }

    if(isLoading){
        return (
            <Loader title="Загрузка..."/>
        )
    }

    if(tests && tests.length <= 0 && !isLoading){
        return (
            <h2>По Вашему запросу ничего не найдено</h2>
        )
    }

    return (
        <>
            <Table columns={isTeacherProfile ? teacherTableColumns : studentTableColumns}>
                {tests && tests.map(test =>
                    <Table.Row key={test.id}>
                        <Table.Cell>{test.name}</Table.Cell>
                        <Table.Cell>{test.description ? trimString(test.description, 20) : "Без описания"}</Table.Cell>
                        <Table.Cell>{test.timeForPass !== 0 ? test.timeForPass + " мин" : "Без ограничения"}</Table.Cell>
                        <Table.Cell>{test.questions?.length + " шт"}</Table.Cell>
                        {isTeacherProfile ?
                            <>
                                <Table.Cell>
                                    {test.groups.map(group =>
                                        <ul key={group.id}>{group.name}</ul>
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => editTest(test.id)}>Редактировать</Button>
                                </Table.Cell>
                            </>
                            :
                            <Table.Cell>
                                <Button onClick={() => openTestPreviewModal(test)}>Предпросмотр</Button>
                            </Table.Cell>
                        }
                    </Table.Row>
                )}
            </Table>
            <TestPreviewModal test={test}/>
        </>
    );
});