import React, {FC, memo} from 'react';
import style from "./Styles.module.scss";
import {Button, Modal} from "../../../../ui";
import {LocalStorage} from "../../../../utils/local-storage";
import {Modals} from "../../../../ui/Modal";
import useAction from "../../../../hooks/redux";

interface IModalProps {
    setOldData: () => void;
    setInitialData: () => void;
}

export const HasOldTemplateModal: FC<IModalProps> = memo(({setOldData, setInitialData}) => {
    const {closeModal} = useAction()

    const setOldState = () => {
        closeModal();
        setOldData();
    }

    const setNewState = () => {
        closeModal();
        setInitialData();
        LocalStorage.remove('createTestData')
    }

    return (
        <Modal modalName={Modals.HAS_TEMPLATE} title="Предупреждение" closable={false}>
            <div>
                <h3>У вас уже есть незаконченный шаблон теста. Вы хотите продолжить его заполнение?</h3>
                <div className={style.modalButtons}>
                    <Button onClick={setOldState}>Да, продолжить</Button>
                    <Button onClick={setNewState}>Нет, хочу начать заново</Button>
                </div>
            </div>
        </Modal>
    );
});
