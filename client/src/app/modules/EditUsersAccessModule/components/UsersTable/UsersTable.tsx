import React, {FC} from 'react';
import {Button, Loader, Table} from "../../../../ui";
import {usersTableColumns} from "./table-columns";
import {IUser} from "../../../../models/IUser";
import {ChangeAccessButton} from "../ChangeAccessButton";

interface IProps {
    users: IUser[],
    isLoading: boolean
}

export const UsersTable: FC<IProps> = ({users, isLoading}) => {

    if(isLoading){
        return (
            <Loader title="Загрузка..."/>
        )
    }

    if(users && users.length <= 0 && !isLoading) {
        return (
            <h2>По Вашему запросу ничего не найдено</h2>
        )
    }

    return (
        <>
            <Table columns={usersTableColumns}>
                {users && users.map(user =>
                    <Table.Row key={user.id}>
                        <Table.Cell>{user.secondName + " " + user.firstName + " " + user?.patronymic}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.role}</Table.Cell>
                        <Table.Cell>{user.universityID}</Table.Cell>
                        <Table.Cell>{user.groupID}</Table.Cell>
                        <Table.Cell>{user.hasAccess ? "Доступ есть" : "Доступ ограничен"}</Table.Cell>
                        <Table.Cell>
                            <ChangeAccessButton userEmail={user.email} hasAccess={user.hasAccess}/>
                        </Table.Cell>
                    </Table.Row>
                )}
            </Table>
        </>
    );
};
