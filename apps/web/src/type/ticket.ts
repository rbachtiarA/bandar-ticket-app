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