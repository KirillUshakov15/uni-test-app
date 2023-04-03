import {IGroup} from "./group/IGroup";

export interface IUniversity {
    id: number;
    name: string;
    description?: string;
}

export interface IUniversityPagination {
    count: number;
    rows: IUniversity[]
}