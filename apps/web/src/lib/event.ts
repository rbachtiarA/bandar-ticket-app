'use server'

import { PostEvent } from "@/app/interfaceType";

export const getEvents = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}event`, {next: {revalidate: 60}})
    const data = await res.json()
    console.log(process.env.NEXT_PUBLIC_BASE_API_URL);
    

    return { name: 'all event', data: data.result}
}

export const getEventCategory = async (category: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}event/cat/${category}`)
    const data = await res.json()

    return {name:category, data: data.result}
}

export const getEventUpcoming = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}event/upcoming`)
    const data = await res.json()

    return {name:'Upcoming Event', data: data.result}
}

export const getEventSlug = async (slug: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}event/e/${slug}`, {next: {revalidate: 10}})
    const data = await res.json()

    return {name:`event ${slug}`, data: data.result}
}

export const postEvent = async (data: PostEvent) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}event/web`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type":"application/json"
        }
    })

    const result = await res.json()
    console.log(result);
    

    return { result, ok: res.ok }
}