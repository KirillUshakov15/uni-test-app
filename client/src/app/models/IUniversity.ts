export interface IGroup {
    id: number;
    name: string;
    universityID: number;
}

export interface IUniversity {
    id: number;
    name: string;
    description?: string | null;
}