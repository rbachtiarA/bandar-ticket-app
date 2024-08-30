export const getEvents = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}event`, {next: {revalidate: 1}})
    const data = await res.json()
    console.log(process.env.NEXT_PUBLIC_BASE_API_URL);
    

    return { name: 'all event', data: data.result}
}