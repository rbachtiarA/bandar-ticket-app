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