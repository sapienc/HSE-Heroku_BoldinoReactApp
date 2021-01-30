// import { HeadingsEnum } from "../../../shared/ui/headingEnum"

import { UIActions } from "../../actions/ui/uiActions";
import { UI_CHANGE_HEADING } from "../../types/uiActionsTypes";

export type UIState = {
    heading: boolean
}

const initialState: UIState = {
    heading: true
}

export const uiReducer = function (state = initialState, action: UIActions) {
    switch(action.type)
    {
        // ===== [СМЕНА ШАПКИ] =====
        case UI_CHANGE_HEADING:
            return {
                ...state,
                heading: action.payload
            }

        default: return state;
    }
}