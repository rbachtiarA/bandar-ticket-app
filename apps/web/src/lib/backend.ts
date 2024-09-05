'use server'

export const getProvince = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}backend/province`, {next: {revalidate: 10}})
    const data = await res.json()  
    console.log(data);
    
    return data.result
}
export const getCity = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}backend/city`, {next: {revalidate: 10}})
    const data = await res.json()  

    return data.result
}