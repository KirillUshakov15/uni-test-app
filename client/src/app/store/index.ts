import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {api} from "../services";
import authSlice from "./auth/slice";
import popupSlice from "./popup/slice";

const rootReducer = combineReducers({
   auth: authSlice,
   popup: popupSlice,
   [api.reducerPath]: api.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(api.middleware)
    })
}

export type AppStore = ReturnType<typeof setupStore>
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']