export interface IEventold {
    title: string
    img: string
    date: string
    location: string
}
export interface ICategory {
    name: string
    events: IEventold[]
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
}

export interface ITicketType {
    id:number
    name: string
    description: string
    eventId:number
    price: number
    quota: number
}

export interface PostTicketType {
    ticketName: string
    ticketDescription: string
    ticketPrice:number
    ticketQuota: number
}

export interface ICity {
    id: number
    name: string
    provinceId: number
    province: IProvince
}

export interface IProvince {
    id: number
    name: string
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

export interface ICart {
    quantity: number,
    ticketType: number,
    price: number,
    totalPrice: number
}