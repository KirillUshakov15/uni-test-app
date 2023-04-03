import React, {FC, memo, useContext, useEffect} from 'react';
import {Card, CheckBox, Divider, Input, Loader} from "../../../../../ui";
import style from './StepForms.module.scss'
import {CreateTestDataContext} from "../../TestEditorLayout";
import {useFetchGroupsQuery} from "../../../../../services/university-service";
import {useTypedSelector} from "../../../../../hooks/redux";
import {IGroup} from "../../../../../models/IUniversity";

const Step1Form: FC = memo(() => {
    const {data, setData} = useContext(CreateTestDataContext);

    const {userData} = useTypedSelector(state => state.auth);

    const {data: groups = [] as IGroup[], isLoading} = useFetchGroupsQuery(userData.universityID!)

    const selectGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked){
            data.groups.push(parseInt(e.target.value))
            return setData({...data})
        }
        data.groups = data.groups.filter(group => group !== parseInt(e.target.value))
        setData({...data})
    }

    return (
        <div>
            <div className={style.content}>
                <Card width={600}>
                    <h4>Наименование</h4>
                    <Input
                        placeholder="Введите название теста..."
                        value={data.name}
                        onChange={e => setData({...data, name: e.target.value})}
                    />
                    <Input
                        placeholder="Добавьте описание теста..."
                        value={data.description || ''}
                        onChange={e => setData({...data, description: e.target.value})}
                    />
                    <Divider/>
                    <h4>Распределение по группам*</h4>
                    <p>*Укажите, каким учебным группам будет доступен данный тест</p>
                    <div className={style.groupsWrapper}>
                        <div className={style.groupsContainer}>
                            <>
                                {isLoading && <Loader title="Загрузка..."/>}
                            </>
                            {groups.map((group, index) =>
                                <CheckBox
                                    checked={!!data.groups.find(gr => gr === group.id)}
                                    id={index.toString()}
                                    key={index}
                                    value={group.id}
                                    label={group.name}
                                    onChange={selectGroup}
                                />
                            )}
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
});
export default Step1Form;