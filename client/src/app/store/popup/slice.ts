import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IModal {
    isOpen: boolean,
    name: string,
}

interface IAlert {
    isShow: boolean,
    title: string
}

interface IPopupState {
    modal: IModal,
    alert: IAlert
}

const initialState: IPopupState = {
    modal: {
        isOpen: false,
        name: '',
    },
    alert: {
        isShow: false,
        title: ''
    }
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setOpenModal(state, action: PayloadAction<IModal>){
            state.modal.isOpen = action.payload.isOpen;
            state.modal.name = action.payload.name;
        },
        setShowAlert(state, action: PayloadAction<IAlert>){
            state.alert.isShow = action.payload.isShow;
            state.alert.title = action.payload.title;
        },
    }
})

export default popupSlice.reducer;