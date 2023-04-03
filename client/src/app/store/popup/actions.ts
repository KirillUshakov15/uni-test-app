import {AppDispatch} from "../index";
import {popupSlice} from "./slice";


export const popupActionCreator = {
    openModal: (name: string) => (dispatch: AppDispatch) => {
        dispatch(popupSlice.actions.setOpenModal({
            isOpen: true,
            name: name
        }))
    },
    closeModal: () => (dispatch: AppDispatch) => {
        dispatch(popupSlice.actions.setOpenModal({
            isOpen: false,
            name: ''
        }))
    },
    showAlert: (title: string) => (dispatch: AppDispatch) => {
        dispatch(popupSlice.actions.setShowAlert({
            isShow: true,
            title: title
        }))
    },
    closeAlert: () => (dispatch: AppDispatch) => {
        dispatch(popupSlice.actions.setShowAlert({
            isShow: false,
            title: ''
        }))
    },
}