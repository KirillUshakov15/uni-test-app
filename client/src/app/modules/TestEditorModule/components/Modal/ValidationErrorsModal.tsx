import React, {FC, memo} from 'react';
import {Modal, Modals} from "../../../../ui/Modal";
import style from './Styles.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from '@fortawesome/free-solid-svg-icons'

interface IModalProps {
    errors: string[];
}

export const ValidationErrorsModal: FC<IModalProps> = memo(({errors}) => {

    return (
        <Modal modalName={Modals.VALIDATION_ERRORS} title="Ошибка при валидации">
            <h4>При создании теста возникли проблемы. Исправьте найденные ошибки и повторите попытку:</h4>
            <div className={style.errorsBody}>
                {errors.map((error, index) =>
                    <div key={index} className={style.error}>
                        <FontAwesomeIcon className={style.icon} icon={faCircleXmark}/>
                        <p>{error}</p>
                    </div>
                )}
            </div>
        </Modal>
    );
});