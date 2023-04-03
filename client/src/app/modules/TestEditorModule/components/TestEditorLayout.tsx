import React, {createContext, FC, memo, useEffect, useState} from 'react';
import style from './Styles.module.scss'
import {FormManager} from "./Forms";
import {IQuestionCreate, ITestCreate} from "../../../models/ITestCreate";
import {Button, Loader} from "../../../ui";
import {LocalStorage} from "../../../utils/local-storage";
import {HasOldTemplateModal, ValidationErrorsModal} from "./Modal";
import {Modals} from "../../../ui/Modal";
import {HOME_PAGE_ROUTE, TEACHER_TESTS_PAGE_ROUTE, TEST_CREATE_PAGE_ROUTE} from "../../../constants/routes";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {hasValidationErrors} from "../utils/steps-validator";
import useAction from "../../../hooks/redux";
import {useCreateTestMutation, useEditTestMutation, useFetchTestQuery} from "../../../services/test-service";
import {IQuestion, ITest} from "../../../models/ITest";
import deepCopy from "../../../utils/deep-copy";

const initialState = {
    name: '',
    description: null,
    groups: [],
    marks: {
        excellent: 90,
        good: 70,
        normal: 50
    },
    timeForPass: 0,
    questions: [] as IQuestionCreate[]
}

type CreateTestDataContextType = {
    data: ITestCreate,
    setData: React.Dispatch<React.SetStateAction<ITestCreate>>,
}

export const CreateTestDataContext = createContext<CreateTestDataContextType>({
    data: initialState,
    setData: () => {},
});

export const TestEditorLayout: FC = memo(() => {
    const stepsCount = 3;
    const navigate = useNavigate();
    const [errors, setErrors] = useState([] as string[])
    const [data, setData] = useState<ITestCreate>(initialState);
    const [step, setStep] = useState(1);

    const location = useLocation();
    const isCreatePage = location.pathname === TEST_CREATE_PAGE_ROUTE;
    const {id} = useParams();
    const {data: testData = {} as ITest, isSuccess: testDataSuccessLoaded, isLoading: testDataLoading}
        = useFetchTestQuery(id!, {skip: isCreatePage})
    const [editTest, {isSuccess: editTestSuccess, isLoading: editTestLoading}] = useEditTestMutation()

    const [createTest, {isSuccess: createTestSuccess, isLoading: createTestLoading}] = useCreateTestMutation();
    const {openModal} = useAction();

    const isLoading = createTestLoading || editTestLoading;
    const isSuccess = editTestSuccess || createTestSuccess;

    const submit = () => {
        const validationErrors = hasValidationErrors(data);

        if(validationErrors.length > 0){
            setErrors(validationErrors)
            openModal(Modals.VALIDATION_ERRORS);
        }
        else{
            isCreatePage
            ? createTest(data)
            : editTest({body: data, id: testData.id})
        }
    }

    useEffect(() => {
        if(testData === null){
           return navigate(HOME_PAGE_ROUTE)
        }
        if(!isCreatePage && testDataSuccessLoaded){
            setDataForEditTest();
        }
    }, [testData]);

    useEffect(() => {
        if(isSuccess){
            navigate(TEACHER_TESTS_PAGE_ROUTE);
        }
    }, [isSuccess])

    useEffect(() => {
        if(isCreatePage){
            if(LocalStorage.get('createTestData')){
               openModal(Modals.HAS_TEMPLATE);
            }
            else{
                setInitialState();
            }
            setStep(1);
        }
    }, [isCreatePage])

    useEffect(() => {
        if(data !== initialState && isCreatePage){
            LocalStorage.set('createTestData', JSON.stringify(data));
        }
    }, [data])

    const setOldState = () => {
        setData(JSON.parse(LocalStorage.get('createTestData') || ''));
    }

    const setInitialState = () => {
        setData(initialState);
    }

    const setDataForEditTest = () => {
        setData({...data,
            name: testData.name || '',
            description: testData.description || '',
            groups: [...testData.groups.map(group => { return group.id })],
            marks: testData.marks,
            questions: deepCopy(testData.questions),
            timeForPass: testData.timeForPass,
        })
    }

    const stepForward = () => {
        setStep(prevState => prevState + 1)
    }

    const stepBack = () => {
        setStep(prevState => prevState - 1)
    }

    if(testDataLoading){
        return (
            <div className={style.loader}>
                <Loader title="Загрузка данных..."/>
            </div>
        )
    }

    return (
        <div>
            <div className={style.stepHeader}>
                <span>{isCreatePage ? "Создание теста" : `Редактирование теста - "${data.name}"`}</span>
                <span>Шаг {step}/{stepsCount}</span>
            </div>
            <div className={style.body}>
                <CreateTestDataContext.Provider value={{data, setData}}>
                    <FormManager currentStep={step}/>
                </CreateTestDataContext.Provider>
            </div>
            <div className={style.footer}>
                <div>
                    <Button
                        className={(step < 2) ? style.displayNone : undefined}
                        onClick={stepBack}
                    >
                        Назад
                    </Button>
                </div>
                <div>
                    <Button
                        className={(step !== 3) ? style.displayNone : undefined}
                        loading={isLoading}
                        onClick={submit}
                    >
                        {isCreatePage ? "Создать тест" : "Редактировать тест"}
                    </Button>
                </div>
                <div>
                    <Button
                        className={(step >= stepsCount) ? style.displayNone : undefined}
                        onClick={stepForward}
                    >
                        Далее
                    </Button>
                </div>
            </div>

            <ValidationErrorsModal errors={errors}/>
            <HasOldTemplateModal setInitialData={setInitialState} setOldData={setOldState}/>
        </div>
    );
});
