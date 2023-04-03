import React, {FC, memo} from 'react';
import {Modal} from "../../../../ui";
import {Modals} from "../../../../ui/Modal";
import {ChangePasswordForm} from "../ChangePasswordForm";

export const ChangePasswordModal: FC = memo(() => {

    return (
        <Modal modalName={Modals.CHANGE_PASSWORD} title="Смена пароля">
            <ChangePasswordForm/>
        </Modal>
    );
});