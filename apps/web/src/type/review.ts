import { IUser } from "./user"

export interface PostReview {
    rating: number
    review: string
    feedback: string
    eventId: number
    userId: number
}

export interface IReview {
    id: number
    rating: number
    review: string
    feedback: string
    eventId: number
    userId: number
    customer: IUser
}