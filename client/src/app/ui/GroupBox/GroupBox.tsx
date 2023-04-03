import React, {FC, useEffect, useState} from 'react';
import style from './GroupBox.module.scss'

interface IGroupBoxProps {
    height?: number;
    width?: number;
    children: React.ReactNode
}

interface GroupBoxExtensions {
    Item: typeof GroupBoxItem
}

export const GroupBox: FC<IGroupBoxProps> & GroupBoxExtensions = ({
                                         width,
                                         height,
                                         children
}) => {
    return (
        <div className={style.groupBox} style={{width: width, height: height}}>
            {children}
        </div>
    );
};

interface IGroupBoxItemProps {
    children: React.ReactNode;
    value?: number | string | null
}

const GroupBoxItem: FC<IGroupBoxItemProps> = ({children, value}) => {
    const click = () => {
        console.log(value);
    }

    return (
        <ul onClick={click} className={style.groupBoxItem}>
            {children}
        </ul>
    )
}

GroupBox.Item = GroupBoxItem