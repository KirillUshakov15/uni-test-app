import {GET_GROUP, GET_GROUPS, GET_UNIVERSITIES, GET_UNIVERSITY} from "../constants/api";
import {IGroup, IUniversity} from "../models/IUniversity";
import {api} from "./index";

export const universityAPI = api.injectEndpoints({
    endpoints: (build) => ({
        fetchUniversities: build.query<IUniversity[], ''>({
            query: () => ({
                url: GET_UNIVERSITIES,
                method: 'GET',
            })
        }),
        fetchUniversity: build.query<IUniversity, number>({
            query: (id: number) => ({
                url: GET_UNIVERSITY,
                method: 'GET',
                params: {
                    id: id
                }
            })
        }),
        fetchGroups: build.query<IGroup[], number>({
            query: (universityID?: number) => ({
                url: GET_GROUPS,
                method: 'GET',
                params: {
                    universityID: universityID
                }
            })
        }),
        fetchGroup: build.query<IGroup, {universityID: number, groupID: number}>({
            query: (queryParams) => {
                const {universityID, groupID} = queryParams;
                return {
                    url: GET_GROUP,
                    method: 'GET',
                    params: {
                        universityID: universityID,
                        groupID: groupID
                    }
                }
            },
        }),
    })
});

export const {
    useFetchUniversitiesQuery,
    useFetchUniversityQuery,
    useFetchGroupsQuery,
    useFetchGroupQuery,
} = universityAPI;