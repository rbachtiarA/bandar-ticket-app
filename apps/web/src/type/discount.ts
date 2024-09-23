export interface PostDiscountType {
    discountName: string,
    discountDescription: string,
    discountCutType: string,
    discountCut: number,
    discountReqQuantity: number,
    discountReqPrice: number,
    discountLimit: number,
    discountDateExpire: string,
    eventId: number
}

export interface IDiscountType {
    id: number,
    name: string,
    description: string,
    cutType: string,
    cut: number,
    eventID: number,
    minQuantiy:number,
    minPrice:number,
    limit: number,
    expiredDate: Date
}