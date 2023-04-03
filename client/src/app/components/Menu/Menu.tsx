import React, {FC} from 'react';
import {Roles} from "../../models/IUser";
import {StudentProfileMenu, TeacherProfileMenu, AdminProfileMenu} from "./ProfileMenu";

interface IMenuProps {
    role: Roles
}

export const Menu: FC<IMenuProps> = ({role}) => {
    switch (role){
        case Roles.STUDENT: {
            return (
                <StudentProfileMenu/>
            )
        }

        case Roles.TEACHER: {
            return (
                <TeacherProfileMenu/>
            )
        }

        case Roles.ADMIN: {
            return (
                <AdminProfileMenu/>
            )
        }

        default: {
            return (
                <></>
            )
        }
    }
};