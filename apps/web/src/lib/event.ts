import { PostEvent } from "@/type/event";

export const getEvents = async (search='', category='', location='') => {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}event${search !== ''? `?search=${search}` : ''}${category !== ''}&category=${category}`, {next: { revalidate: 5 }})
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}event?search=${search}&category=${category}&location=${location}`, {next: { revalidate: 5 }})
    const data = await res.json()    

    return { name: 'all event', data: data.result}
}

export const getEventCategory = async (category: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}event/cat/${category}`, {next: {revalidate: 10}})
    const data = await res.json()

    return {name:category, data: data.result}
}

export const getEventUpcoming = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}event/upcoming`, {next: { revalidate: 10 }})
    const data = await res.json()

    return {name:'Upcoming Event', data: data.result}
}

export const getEventSlug = async (slug: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}event/e/${slug}`, {cache: "no-cache"})
    const data = await res.json()

    return {name:`event ${slug}`, event: data.event, ticket: data.ticket}
}

export const postEvent = async (data: PostEvent, userId:number) => {
    const formData = new FormData();
    formData.append('userId', `${userId}`)
    formData.append('eventPoster', data.eventPoster)
    formData.append('eventDescription', data.eventDescription)
    formData.append('eventName', data.eventName)
    formData.append('eventProvince', data.eventProvince)
    formData.append('eventQuota', `${data.eventQuota}`)
    formData.append('eventCity', `${data.eventCity}`)
    formData.append('eventTimeStart', data.eventTimeStart)
    formData.append('eventTimeEnd', data.eventTimeEnd)
    formData.append('eventDateStart', data.eventDateStart)
    formData.append('eventDateEnd', data.eventDateEnd)
    formData.append('eventAddress', data.eventAddress)
    formData.append('eventCategory', data.eventCategory)

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}event/web`, {
        // headers: {
        //     "Content-Type":"multipart/form-data"
        // },
        method: 'POST',
        body: formData,
    })

    const result = await res.json()    

    return { result, ok: res.ok }
}