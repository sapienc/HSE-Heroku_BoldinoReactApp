import { UI_CHANGE_HEADING } from "../../types/uiActionsTypes"

export const changeHeading = (payload: boolean) => {
    return {
        type: UI_CHANGE_HEADING,
        payload
    }
}

export type UIActions = ReturnType<typeof changeHeading>;