import React, {FC} from 'react';
import style from './Modal.module.scss'
import useAction, {useTypedSelector} from "../../hooks/redux";

interface IModalProps {
    modalName: string;
    children?: React.ReactNode
    closable?: boolean
    title?: string
}

export const Modal: FC<IModalProps> = ({
                                           modalName,
                                           closable = true,
                                           title,
                                           children
}) => {
    const {isOpen, name} = useTypedSelector(state => state.popup.modal)
    const {closeModal} = useAction();

    const modalClose = () => {
        if(closable){
            closeModal();
        }
    }

    const isRightName = modalName === name;

    return (
        <div className={(isOpen && isRightName) ? `${style.modal} ${style.modalActive}`: style.modal} onClick={modalClose}>
            <div className={style.modalBody} onClick={e => e.stopPropagation()}>
                <div className={style.modalHeader}>
                    <h4>{title}</h4>
                    <span className={!closable ? `${style.displayNone}` : undefined} onClick={closeModal}>X</span>
                </div>
                <hr/>
                <div className={style.modalContent}>
                    {children}
                </div>
            </div>
        </div>
    );
};
