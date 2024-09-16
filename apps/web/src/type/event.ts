import { ICity } from "./province"
export interface TempUser {
    id: number
    name: string
    role: Role
    Event: IEvent[]
}

enum Role {
    CUSTOMER,
    ORGANIZER,
    ADMIN
}

export interface IEvent {
    id: number
    slug: string
    name: string
    description: string
    location: string
    cityId: number
    date_start: Date
    date_end: Date
    img_poster: string
    max_quota: string
    createdAt: Date
    updatedAt: Date
    city: ICity
    user: TempUser
}

export interface PostEvent {
    eventName: string,
    eventCategory: string,
    eventDateStart: string,
    eventDateEnd: string,
    eventTimeStart: string,
    eventTimeEnd: string,
    eventDescription: string,
    eventAddress: string,
    eventProvince: string,
    eventCity: number,
    eventPoster: string
    eventQuota: number
}

export interface ICategory {
    name: string
    events: IEventold[]
}

export interface IEventold {
    title: string
    img: string
    date: string
    location: string
}