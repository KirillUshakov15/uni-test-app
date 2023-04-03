import {LOGIN, LOGOUT, REFRESH_ACCESS, REGISTRATION} from "../constants/api";
import {IAuth, ILogin, IRegistration} from "../models/IAuth";
import {authSlice} from "../store/auth/slice";
import {popupActionCreator} from "../store/popup/actions";
import {Modals} from "../ui/Modal";
import {api} from "./index";

export const authAPI = api.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation({
            query: (loginData: ILogin) => {
                return {
                    url: LOGIN,
                    method: 'POST',
                    body: loginData,
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                   const {data} = await queryFulfilled;
                   dispatch(authSlice.actions.setAuth(data));
                   dispatch(popupActionCreator.showAlert(`Здравствуйте, ${data.userData.firstName}`))
                } catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message))
                }
            },
        }),
        registration: build.mutation({
            query: (registrationData: IRegistration) => {
                return {
                    url: REGISTRATION,
                    method: 'POST',
                    body: registrationData,
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    await queryFulfilled;
                    dispatch(popupActionCreator.openModal(Modals.SUCCESS_REGISTRATION))
                }
                catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message))
                }
            }
        }),
        logout: build.mutation({
            query: () => {
                return {
                    url: LOGOUT,
                    method: 'GET',
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, {dispatch}){
                dispatch(authSlice.actions.authLogout())
            }
        }),
        refreshAccess: build.mutation({
            query: () => {
                return {
                    url: REFRESH_ACCESS,
                    method: 'GET',
                    credentials: 'include',
                }
            },
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const {data} = await queryFulfilled;
                    dispatch(authSlice.actions.setAuth(data));
                } catch (e: any) {
                    dispatch(popupActionCreator.showAlert(e.error.data.message))
                }
            },
        })
    })
});

export const {useLoginMutation, useRegistrationMutation, useLogoutMutation, useRefreshAccessMutation} = authAPI;