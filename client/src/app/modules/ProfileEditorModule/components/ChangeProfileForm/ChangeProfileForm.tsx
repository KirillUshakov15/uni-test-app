import React, {FC, memo, useState} from 'react';
import {Button, Card, Divider, Form, Input} from "../../../../ui";
import useAction, {useTypedSelector} from "../../../../hooks/redux";
import style from '../FormStyle.module.scss'
import {Roles} from "../../../../models/IUser";
import {useEditProfileMutation} from "../../../../services/user-service";
import {ChangePasswordModal} from "../ChangePasswordModal";
import {Modals} from "../../../../ui/Modal";
import {useFetchGroupQuery, useFetchUniversityQuery} from "../../../../services/university-service";
import {isCorrectUsername, isRequiredField} from "../../../../utils/validation-templates";

interface IUserProfile {
    firstName: string,
    secondName: string,
    patronymic?: string,
}

export const ChangeProfileForm: FC = memo(() => {

    const {userData} = useTypedSelector(state => state.auth);

    const initialState = {
        firstName: userData.firstName,
        secondName: userData.secondName,
        patronymic: userData?.patronymic,
    }

    const isStudentProfile = userData.role === Roles.STUDENT

    const [user, setUser] = useState<IUserProfile>(initialState);
    const [editProfile, {isLoading}] = useEditProfileMutation();

    const {data: university} = useFetchUniversityQuery(userData.universityID!);

    const {data: group} = useFetchGroupQuery({
       universityID: userData.universityID!,
       groupID: userData.groupID!
    }, {skip: !isStudentProfile});

    const {openModal} = useAction();

    const openPasswordModal = () => {
        openModal(Modals.CHANGE_PASSWORD)
    }

    const submit = () => {
        editProfile(user);
    }

    return (
        <div className={style.profileFormWrapper}>
            <Card width={600}>
                <Form onFinish={submit}>
                    <h3>Редактирование профиля</h3>

                    <div className={style.formContainer}>
                        <p>Электронная почта: {userData.email}</p>

                        <Form.Validator rules={[isRequiredField, isCorrectUsername]}>
                            <Input
                                placeholder="Введите фамилию..."
                                value={user.secondName}
                                onChange={e => setUser({...user, secondName: e.target.value})}
                            />
                        </Form.Validator>

                        <Form.Validator rules={[isRequiredField, isCorrectUsername]}>
                            <Input
                                placeholder="Введите имя..."
                                value={user.firstName}
                                onChange={e => setUser({...user, firstName: e.target.value})}
                            />
                        </Form.Validator>

                        <Form.Validator rules={[isCorrectUsername]}>
                            <Input
                                placeholder="Введите Отчество (при наличии)..."
                                value={user.patronymic}
                                onChange={e => setUser({...user, patronymic: e.target.value})}
                            />
                        </Form.Validator>

                        <div>
                            <p>Учебное заведение: {university?.name}</p>
                            {isStudentProfile &&
                                <p>Учебная группа: {group?.name}</p>
                            }
                        </div>
                        <div className={style.editButtonWrapper}>
                            <Button type="submit" loading={isLoading}>Редактировать профиль</Button>
                        </div>
                    </div>
                </Form>
                <Divider/>
                <Button onClick={openPasswordModal}>Смена пароля</Button>
            </Card>
            <ChangePasswordModal/>
        </div>
    );
});
