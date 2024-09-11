import { ICart } from "@/app/interfaceType"

export const getProvince = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}backend/province`, {next: {revalidate: 3600}})
    const data = await res.json()
    
    return data.result
}
export const getCity = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}backend/city`, {next: {revalidate: 3600}})
    const data = await res.json()  

    return data.result
}

export const postTransaction = async (transaction: {userId: number, cart:ICart[]}) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}backend/transaction`, {
        method: "POST",
        body: JSON.stringify(transaction),
        headers: {"Content-Type":"application/json"}
    })
    const data = await res.json()

    return data;
}