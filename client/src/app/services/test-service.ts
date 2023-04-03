import {
    CALCULATE_RESULT,
    CREATE_TEST,
    EDIT_TEST,
    GET_TEST_RESULT,
    GET_TEST,
    GET_TEST_FOR_PASSING,
    GET_TESTS, GET_TESTS_RESULT
} from "../constants/api";
import {ITestCreate} from "../models/ITestCreate";
import {LocalStorage} from "../utils/local-storage";
import {IQuestion, ITest, ITestsPagination} from "../models/ITest";
import {popupActionCreator} from "../store/popup/actions";
import {api} from "./index";
import {ITestResult, ITestResultPagination, Marks} from "../models/ITestResult";

interface IQuery{
    page?: number;
    limit?: number;
    student?: number;
    author?: number,
    search?: string
    group?: number | null,
}

interface ITestsQueryParams extends IQuery{
    time?: number;
}

interface ITestsResultQueryParams extends IQuery{
    testID?: number
    mark?: string
}

export const testAPI = api.injectEndpoints(({
    endpoints: (build) => ({
        fetchTests: build.query<ITestsPagination, ITestsQueryParams>({
            query: (queryParams: ITestsQueryParams) => {
                const {search, author, group, page, limit, time, student} = queryParams;
                return {
                    url: GET_TESTS,
                    params: {
                        author: author,
                        search: search,
                        group: group,
                        page: page,
                        limit: limit,
                        time: time,
                        student: student
                    },
                    headers: {
                        'authorization': `Bearer ${LocalStorage.get('accessToken')}`
                    },
                }
            },
            providesTags: result => ['Test']
        }),
        createTest: build.mutation({
            query: (body: ITestCreate) => ({
                url: CREATE_TEST,
                method: 'POST',
                headers: {
                  'authorization': `Bearer ${LocalStorage.get('accessToken')}`
                },
                body
            }),
            async onQueryStarted(args,{dispatch, queryFulfilled}){
                try{
                    await queryFulfilled;
                    LocalStorage.remove('createTestData');
                    dispatch(popupActionCreator.showAlert('Тест успешно создан!'))
                }
                catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message))
                }
            },
            invalidatesTags: result => ['Test']
        }),
        editTest: build.mutation({
           query: (editData: {body: ITestCreate, id: number}) => {
               const {body, id} = editData;
               return {
                   url: EDIT_TEST + id,
                   method: 'PATCH',
                   headers: {
                       'authorization': `Bearer ${LocalStorage.get('accessToken')}`
                   },
                   body
               }
           },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
               try{
                   await queryFulfilled;
                   dispatch(popupActionCreator.showAlert('Тест успешно отредактирован!'))
               }
               catch (e: any) {
                   dispatch(popupActionCreator.showAlert(e.error.data.message))
               }
            },
            invalidatesTags: result => ['Test']
        }),
        fetchTest: build.query<ITest, string>({
            query: (id: string) => {
                return {
                    url: GET_TEST,
                    params: {
                        id: id
                    },
                    headers: {
                        'authorization': `Bearer ${LocalStorage.get('accessToken')}`
                    },
                }
            },
            providesTags: result => ['Test']
        }),
        fetchTestForPassing: build.query<ITest, string>({
            query: (id: string) => {
                return {
                    url: GET_TEST_FOR_PASSING,
                    params: {
                        id: id
                    },
                    headers: {
                        'authorization': `Bearer ${LocalStorage.get('accessToken')}`
                    },
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    await queryFulfilled;
                }
                catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message))
                }
            },
            providesTags: result => ['Test']
        }),
        calculateResult: build.mutation({
            query: (body: {id: number, questions: IQuestion[]}) => {
                return {
                    url: CALCULATE_RESULT,
                    method: 'POST',
                    headers: {
                        'authorization': `Bearer ${LocalStorage.get('accessToken')}`
                    },
                    body
                }
            },
            invalidatesTags: result => ['Test']
        }),
        getTestResult: build.query<ITestResult, ITestsResultQueryParams>({
            query: (queryParams: ITestsResultQueryParams) => {
                const {testID, student} = queryParams;
                return {
                    url: GET_TEST_RESULT,
                    params: {
                        testID: testID,
                        student: student
                    },
                    headers: {
                        'authorization': `Bearer ${LocalStorage.get('accessToken')}`
                    },
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    await queryFulfilled;
                }
                catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message))
                }
            },
            providesTags: result => ['Test']
        }),
        getTestsResult: build.query<ITestResultPagination, ITestsResultQueryParams>({
            query: (queryParams: ITestsResultQueryParams) => {
                const {testID, student, mark, search, limit, page, author, group} = queryParams;
                return {
                    url: GET_TESTS_RESULT,
                    params: {
                        student: student,
                        author: author,
                        testID: testID,
                        mark: mark,
                        search: search,
                        page: page,
                        limit: limit,
                        group: group
                    },
                    headers: {
                        'authorization': `Bearer ${LocalStorage.get('accessToken')}`
                    },
                }
            },
            providesTags: result => ['Test']
        }),
    })
}))

export const {
    useCreateTestMutation,
    useEditTestMutation,
    useFetchTestsQuery,
    useFetchTestQuery,
    useFetchTestForPassingQuery,
    useCalculateResultMutation,
    useGetTestResultQuery,
    useGetTestsResultQuery
} = testAPI;