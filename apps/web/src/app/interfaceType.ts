export interface IEvent {
    title: string
    img: string
    date: string
    location: string
}
export interface ICategory {
    name: string
    events: IEvent[]
}