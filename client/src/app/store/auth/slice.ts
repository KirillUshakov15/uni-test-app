import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {LocalStorage} from "../../utils/local-storage";
import {IAuth} from "../../models/IAuth";

interface IAuthState {
    isAuth: boolean,
    userData: IUser,
}

const initialState: IAuthState = {
    isAuth: false,
    userData: {} as IUser,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<IAuth>){
            state.isAuth = true;
            state.userData = action.payload.userData;
            LocalStorage.set('accessToken', action.payload.accessToken);
        },
        authLogout(state){
            state.isAuth = false;
            state.userData = {} as IUser;
            LocalStorage.remove('accessToken');
        }
    },
});

export default authSlice.reducer;