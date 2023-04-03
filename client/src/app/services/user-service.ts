import {CHANGE_ACCESS_STATE, CHANGE_PASSWORD, EDIT_PROFILE, FETCH_USERS} from "../constants/api";
import {popupActionCreator} from "../store/popup/actions";
import {authSlice} from "../store/auth/slice";
import {LocalStorage} from "../utils/local-storage";
import {api} from "./index";
import {IUserPagination} from "../models/IUser";

interface IUserQueryParams {
    page?: number;
    limit?: number;
    university?: number | null;
    role?: string;
    search?: string;
    hasAccess?: string;
}

export const userAPI = api.injectEndpoints({
    endpoints: (build) => ({
        editProfile: build.mutation({
            query: (editData) => {
                return {
                    url: EDIT_PROFILE,
                    method: 'PATCH',
                    headers: {
                        'authorization': `Bearer ${LocalStorage.get('accessToken')}`
                    },
                    body: editData,
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    const {data} = await queryFulfilled;
                    dispatch(authSlice.actions.setAuth(data));
                    dispatch(popupActionCreator.showAlert(`Ваш профиль успешно отредактирован`))
                }
                catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message))
                }
            }
        }),
        changePassword: build.mutation({
            query: (editData) => {
                return {
                    url: CHANGE_PASSWORD,
                    method: 'PATCH',
                    headers: {
                        'authorization': `Bearer ${LocalStorage.get('accessToken')}`
                    },
                    body: editData,
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    await queryFulfilled;
                    dispatch(popupActionCreator.showAlert(`Пароль успешно изменен`))
                }
                catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message))
                }
            }
        }),
        fetchUsers: build.query<IUserPagination, IUserQueryParams>({
            query: (query: IUserQueryParams) => {
                const {limit, page, role, university, search, hasAccess} = query;
                return {
                    url: FETCH_USERS,
                    method: 'GET',
                    params: {
                        limit: limit,
                        page: page,
                        search: search,
                        university: university,
                        role: role,
                        hasAccess: hasAccess
                    },
                    headers: {
                        'authorization': `Bearer ${LocalStorage.get('accessToken')}`
                    },
                    credentials: 'include',
                }
            },
            providesTags: result => ['User']
        }),
        changeAccessState: build.mutation({
            query: (data) => {
                return {
                    url: CHANGE_ACCESS_STATE,
                    method: 'POST',
                    headers: {
                        'authorization': `Bearer ${LocalStorage.get('accessToken')}`
                    },
                    body: data,
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    const {data} = await queryFulfilled;
                    dispatch(popupActionCreator.showAlert(data.message))
                }
                catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message))
                }
            },
            invalidatesTags: result => ['User']
        }),
    })
});

export const {
    useEditProfileMutation,
    useChangePasswordMutation,
    useFetchUsersQuery,
    useChangeAccessStateMutation
} = userAPI;