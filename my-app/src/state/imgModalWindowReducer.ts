import {AddCommentRequestType, CommentResponseType, GetImageResponseType, imagesApi} from "../api/api";
import {Dispatch} from "redux";

let initialState: ImgModalStateType = {
    src: '',
    comments: []
}

export const imgModalWindowReducer = (state: ImgModalStateType = initialState, action: ModalImgActionType) => {
    switch (action.type) {
        case "SET-MODAL-IMG":
            return {...state, src: action.srs, comments: action.comments}
        case "ADD-COMMENT":
            return {...state, comments: state.comments.push(action.comment)}
        default:
            return state
    }
}

// actions
export const setImgModalAction = (srs: string, comments: Array<CommentResponseType>) => ({
    type: 'SET-MODAL-IMG', srs, comments
}) as const
export const addCommentAction = (comment: CommentResponseType) => ({
    type: 'ADD-COMMENT', comment
}) as const

// thunks
export const setImgModal = (imgId: number) =>
    async (dispatch: Dispatch<ModalImgActionType>) => {
        try {
            let imgResponse = await imagesApi.getImage(imgId)
            let commentsResponse = await imagesApi.getComments(imgId)
            dispatch(setImgModalAction(imgResponse.data.src, commentsResponse.data))
        } finally {
        }
    };

export const addComment = (body: AddCommentRequestType) =>
    async (dispatch: Dispatch<ModalImgActionType>) => {
        try {
            let response = await imagesApi.addComment(body)
            dispatch(addCommentAction(response.data))
        } finally {
        }
    }

// types
export type ImgModalStateType = GetImageResponseType & {
    comments: Array<CommentResponseType>
}
type ModalImgActionType =
    ReturnType<typeof setImgModalAction> |
    ReturnType<typeof addCommentAction>