export interface PostDiscountType {
    discountName: string,
    discountDescription: string,
    discountNominal: number,
    discountPercent: number,
    discountReqQuantity: number,
    discountReqPrice: number,
    discountLimitPrice: number,
    discountDateExpire: string,
    eventId: number
}

export interface IDiscountType {
    id: number,
    name: string,
    description: string,
    nominal: number,
    percent: number,
    eventID: number,
    minQuantiy:number,
    minPrice:number,
    limit: number,
    expiredDate: Date
}