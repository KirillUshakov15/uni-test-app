import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {bindActionCreators} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {actionCreators} from "../store/action-creators";

export default function useAction() {
    const AppDispatch = useDispatch();
    return bindActionCreators(actionCreators, AppDispatch)
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;