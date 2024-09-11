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
    name: string
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

export interface ICity {
    id: number
    city: string
    provinceId: number
    province: IProvince
}

export interface IProvince {
    id: number
    province: string
}