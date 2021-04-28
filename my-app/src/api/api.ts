import axios from "axios";

const instance = axios.create({
    baseURL: ' https://tzfrontend.herokuapp.com/'
})

export const imagesApi = {
    getAllImages: () => {
        return instance.get<Array<GetAllImagesResponseType>>('images/')
    },
    getImage: (imgId: number) => {
        return instance.get<GetImageResponseType>(`images/${imgId}/`)
    },
    getComments: (imgId: number) => {
        return instance.get<Array<CommentResponseType>>(`comments/${imgId}/`)
    },
     addComment: (body: AddCommentRequestType) => {
        return instance.post<CommentResponseType>('comments/add/', body)
    }
}

// types
export type GetAllImagesResponseType = {
    image_id: number
    src: string
}

export type GetImageResponseType = {
    src: string
}

export type AddCommentRequestType = {
    name: string | undefined
    description : string | undefined
    image_id: number
}

export type CommentResponseType = AddCommentRequestType & {
    id: number
}