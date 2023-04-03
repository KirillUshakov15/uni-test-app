import React, {FC} from 'react';
import {Button} from "../../../../ui";
import {useChangeAccessStateMutation} from "../../../../services/user-service";

interface IProps {
    userEmail: string,
    hasAccess: boolean
}

export const ChangeAccessButton: FC<IProps> = ({userEmail, hasAccess}) => {

    const [changeAccess, {isLoading}] = useChangeAccessStateMutation();

    const changeAccessState = () => {
        changeAccess({email: userEmail, accessState: !hasAccess})
    };

    return (
        <Button
            loading={isLoading}
            onClick={changeAccessState}
        >
            {hasAccess ? "Ограничить доступ" : "Предоставить доступ"}
        </Button>
    );
};
