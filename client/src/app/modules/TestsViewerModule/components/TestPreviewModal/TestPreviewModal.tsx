import React, {FC, memo} from 'react';
import {Button, Modal} from "../../../../ui";
import {Modals} from "../../../../ui/Modal";
import {ITest} from "../../../../models/ITest";
import style from './TestPreviewModal.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faClipboard, faClipboardQuestion} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from "react-router-dom";
import useAction from "../../../../hooks/redux";

interface IModalProps {
    test: ITest;
}

export const TestPreviewModal: FC<IModalProps> = memo(({test}) => {

    const navigate = useNavigate();
    const {closeModal} = useAction()

    const redirectToPassTestPage = () => {
        navigate('/pass-test/' + test.id);
        closeModal();
    }

    return (
        <Modal modalName={Modals.TEST_PREVIEW} title="Предпросмотр">
            <div className={style.wrapper}>
                <h2>{test.name}</h2>

                <div>
                    <FontAwesomeIcon icon={faClipboard}/>
                    <p>{test.description ? "Описание теста: " + test.description : "Автор не оставил описание для данного теста"}</p>
                </div>

                <div>
                    <FontAwesomeIcon icon={faClock}/>
                    <p>{test.timeForPass > 0 ? "Время на выполнение: " + test.timeForPass + " мин" : 'Без ограничения по времени'}</p>
                </div>

                <div>
                    <FontAwesomeIcon icon={faClipboardQuestion}/>
                    <p>Количество вопросов: {test.questions && test.questions?.length}</p>
                </div>

                <Button onClick={redirectToPassTestPage}>Приступить к выполнению</Button>
            </div>
        </Modal>
    );
});
