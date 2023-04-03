import React, {FC, memo, useEffect, useMemo, useState} from 'react';
import {Form} from "../../../ui";
import {Link, useNavigate} from "react-router-dom";
import {HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE} from "../../../constants/routes";
import {RadioButton} from "../../../ui";
import style from './Styles.module.scss'
import {Input, Button, Card, Select} from "../../../ui";
import {IRegistration} from "../../../models/IAuth";
import {Roles} from "../../../models/IUser";
import {SuccessRegistrationModal} from "./Modal";
import {useFetchGroupsQuery, useFetchUniversitiesQuery} from "../../../services/university-service";
import {useTypedSelector} from "../../../hooks/redux";
import {useRegistrationMutation} from "../../../services/auth-service";
import {
    isCorrectEmail,
    isCorrectPassword,
    isCorrectUsername,
    isRequiredField
} from "../../../utils/validation-templates";

const initialState = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    secondName: '',
    patronymic: '',
    role: Roles.STUDENT,
    universityID: null,
    groupID: null
}

export const RegistrationForm: FC = memo(() => {
    const navigate = useNavigate();

    const [userData, setUserData] = useState<IRegistration>(initialState)

    const [email, setEmail] = useState('');

    const [studentRoleChecked, setStudentRoleChecked] = useState(true);

    const {data: universities = [], isLoading: universitiesLoaded} = useFetchUniversitiesQuery('');
    const {data: groups = []} = useFetchGroupsQuery(userData.universityID!, {skip: universitiesLoaded});

    const {isAuth} = useTypedSelector(state => state.auth);
    const [registration, {isLoading}] = useRegistrationMutation();

    useEffect(() => {
        if(isAuth){
            navigate(HOME_PAGE_ROUTE);
        }
    }, [isAuth]);

    const submit = () => {
        registration(userData);
    }

    const changeRegistrationRole = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserData({...userData, role: e.target.value as Roles})
        setStudentRoleChecked(!studentRoleChecked);
    }

    const universitySelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserData({...userData, universityID: parseInt(e.target.value)});
    }

    const groupSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setUserData({...userData, groupID: parseInt(e.target.value)})
    }

    const defaultSelectedUniversitiesValue = useMemo(() => {
        if(universities.length > 0){
            setUserData({...userData, universityID: universities[0].id});
            return universities[0].id;
        }
    }, [universities])

    const defaultSelectedGroupsValue = useMemo(() => {
        if(!studentRoleChecked) return setUserData({...userData, groupID: null})

        if(groups.length > 0){
            setUserData({...userData, groupID: groups[0]?.id})
            return groups[0]?.id;
        }
    }, [userData.universityID, groups, studentRoleChecked])

    return (
        <div className={style.wrapper}>
            <Card width={600}>
                <div className={style.content}>
                    <Form onFinish={submit}>

                        <h3>Регистрация</h3>

                        <div className={style.roleContainer}>
                            <RadioButton
                                id="student"
                                group="roles"
                                label="Я студент"
                                value={Roles.STUDENT}
                                checked={studentRoleChecked}
                                onChange={changeRegistrationRole}
                            />
                            <RadioButton
                                id="teacher"
                                group="roles"
                                value={Roles.TEACHER}
                                label="Я преподаватель"
                                onChange={changeRegistrationRole}
                            />
                        </div>

                        <div className={style.nameContainer}>
                            <Form.Validator rules={[isRequiredField, isCorrectUsername]}>
                                <Input
                                    placeholder="Укажите имя"
                                    value={userData.firstName}
                                    onChange={e => setUserData({...userData, firstName: e.target.value})}
                                />
                            </Form.Validator>

                            <Form.Validator rules={[isRequiredField, isCorrectUsername]}>
                                <Input
                                    placeholder="Укажите фамилию"
                                    value={userData.secondName}
                                    onChange={e => setUserData({...userData, secondName: e.target.value})}
                                />
                            </Form.Validator>

                            <Form.Validator rules={[isCorrectUsername]}>
                                <Input
                                    placeholder="Укажите отчество (при наличии)"
                                    value={userData.patronymic}
                                    onChange={e => setUserData({...userData, patronymic: e.target.value})}
                                />
                            </Form.Validator>
                        </div>

                        <div className={style.nameContainer}>
                            <Form.Validator name="email" rules={[...isCorrectEmail]}>
                                <Input
                                    placeholder="Введите адрес электронной почты"
                                    value={userData.email}
                                    onChange={e => setUserData({...userData, email: e.target.value})}
                                />
                            </Form.Validator>

                            <Form.Validator name="password" rules={[...isCorrectPassword]}>
                                <Input.Password
                                    placeholder="Придумайте пароль"
                                    value={userData.password}
                                    onChange={e => setUserData({...userData, password: e.target.value})}
                                />
                            </Form.Validator>

                            <Form.Validator name="confirm-password" rules={[isRequiredField]}>
                                <Input.Password
                                    placeholder="Повторите пароль"
                                    value={userData.confirmPassword}
                                    onChange={e => setUserData({...userData, confirmPassword: e.target.value})}
                                />
                            </Form.Validator>

                        </div>

                        <div className={style.universityContainer}>
                            <Select
                                label="Укажите учебное заведение:"
                                onChange={universitySelectChange}
                                defaultValue={defaultSelectedUniversitiesValue}
                            >
                                {universities?.map((university) =>
                                    <option value={university.id} key={university.id}>{university.name}</option>
                                )}
                            </Select>

                            {studentRoleChecked &&
                                <Select label="Укажите учебную группу:"
                                        onChange={groupSelectChange}
                                        defaultValue={defaultSelectedGroupsValue || ''}
                                >
                                    {groups.map((group) =>
                                        <option value={group.id} key={group.id}>{group.name}</option>
                                    )}
                                </Select>
                            }
                        </div>

                        <p>Уже зарегистрированы? <Link to={LOGIN_PAGE_ROUTE}>Авторизуйтесь!</Link></p>
                        <Button type="submit" loading={isLoading}>Зарегистрироваться</Button>
                    </Form>
                    <SuccessRegistrationModal/>
                </div>
            </Card>
        </div>
    );
});