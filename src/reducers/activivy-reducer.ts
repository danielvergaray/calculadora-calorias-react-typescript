import { Activity } from "../types"

export type ActivityActions = {
    type: 'save-activity',
    payload : { newActivivy: Activity }
}

type ActivityState = {
    activities : Activity[]
}

export const initialState : ActivityState = {
    activities : []
}

export const activityReducer = (state : ActivityState, action : ActivityActions) =>{

    if(action.type === 'save-activity'){

        return {
            ...state,
            activities: [...state.activities, action.payload.newActivivy]
        }
    }

    return state
}