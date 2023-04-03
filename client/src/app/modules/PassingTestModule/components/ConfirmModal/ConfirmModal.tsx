import React, {FC, memo} from 'react';
import {Button, Modal} from "../../../../ui";
import {Modals} from "../../../../ui/Modal";
import useAction from "../../../../hooks/redux";
import style from '../Styles.module.scss'

interface IConfirmModalProps {
    answersStatus: string[]
    onEnding: () => void
}

export const ConfirmModal: FC<IConfirmModalProps> = memo(({answersStatus, onEnding}) => {

    const {closeModal} = useAction();

    const calculateResult = () => {
        onEnding();
        closeModal();
    }

    return (
        <Modal modalName={Modals.CONFIRM_END_OF_TEST} title="Завершение тестирования">
            <div>
                <h3>Вы уверены, что хотите завершить тестирование?</h3>
                <div className={style.answersStatusBody}>
                    {answersStatus.map((status, index) =>
                        <ul key={index}>{status}</ul>
                    )}
                </div>
                <div className={style.buttonsContainer}>
                    <Button onClick={calculateResult}>Завершить тестирование</Button>
                    <Button onClick={closeModal}>Отмена</Button>
                </div>
            </div>
        </Modal>
    );
});
