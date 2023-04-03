import {BaseQueryFn, createApi, FetchArgs, FetchBaseQueryError} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {API_SERVER_URL, REFRESH_ACCESS} from "../constants/api";
import {authSlice} from "../store/auth/slice";
import {IAuth} from "../models/IAuth";

const baseQuery = fetchBaseQuery({
        baseUrl: API_SERVER_URL,
})
const baseQueryWithIntercept: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
    > = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error && result.error.status === 401) {
        const refreshResult = await baseQuery({
            url: REFRESH_ACCESS,
            method: 'GET',
            credentials: 'include',
        }, api, extraOptions)

        console.log(refreshResult)

        if (refreshResult.data) {
            const data = refreshResult.data as IAuth
            api.dispatch(authSlice.actions.setAuth(data));
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result
}

export const api = createApi({
    reducerPath: 'api',
    tagTypes: ['Test', 'Auth', 'University', 'User'],
    baseQuery: baseQueryWithIntercept,
    endpoints: () => ({})
})