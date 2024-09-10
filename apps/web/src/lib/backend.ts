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