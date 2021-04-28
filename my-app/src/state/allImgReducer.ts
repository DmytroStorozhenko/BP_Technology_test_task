import {GetAllImagesResponseType, imagesApi} from "../api/api";
import {Dispatch} from "redux";

let initialState: AllImgStateType = {
    images: []
}

export const allImgReducer = (state = initialState, action: AllImgActionType) => {
    switch (action.type) {
        case "SET-ALL-IMG": return {...state, images: action.images}
        default:
            return state
    }
}

// actions
export const setAllImgAction = (images: Array<GetAllImagesResponseType>) => ({
    type: 'SET-ALL-IMG', images}) as const

// thunks
export const setAllImg = () =>
    async (dispatch: Dispatch<AllImgActionType>) => {
    try {
       let response = await imagesApi.getAllImages()
            dispatch(setAllImgAction(response.data))
    } finally {}
    }

// types
export type AllImgStateType = {
    images: Array<GetAllImagesResponseType>
}
type AllImgActionType = ReturnType<typeof setAllImgAction>