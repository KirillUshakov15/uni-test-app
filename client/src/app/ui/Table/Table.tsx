import React, {FC} from 'react';
import style from './Table.module.scss'
import {Loader} from "../Loader";

interface TableExtensions {
    Row: typeof TableRow
    Cell: typeof TableCell
}

export interface ITableColumn {
    name: string,
    title: string,
}

interface ITableProps extends React.TableHTMLAttributes<HTMLTableElement>{
    children: React.ReactNode,
    columns?: ITableColumn[],
    loading?: boolean
}

export const Table: FC<ITableProps> & TableExtensions = ({children, columns, loading, ...props}) => {
    return (
        <table className={style.table}>
            <thead>
            <Table.Row>
                {columns && columns.map(({name, title}) =>
                    <th key={name}>
                        {title}
                    </th>
                )}
            </Table.Row>
            </thead>
            <tbody>
            {children}
            </tbody>
        </table>
    );
};

interface ITableRowProps{
    children: React.ReactNode
}

const TableRow: FC<ITableRowProps> = ({children}) => {
    return (
        <tr>
            {children}
        </tr>
    )
}

interface ITableCellProps{
    children: React.ReactNode
}

const TableCell: FC<ITableCellProps> = ({children}) => {
    return (
        <td>
            {children}
        </td>
    )
}

Table.Row = TableRow
Table.Cell = TableCell