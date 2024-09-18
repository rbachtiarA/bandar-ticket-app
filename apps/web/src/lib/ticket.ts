import { PostTicketType } from "@/type/ticket"

export const postTicketType = async (data: PostTicketType) => {
    // console.log(data);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}ticket`, {
        method:'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-type":"application/json"
        }
    })
    const result = await res.json()
    // console.log(result);
    return { result, ok: res.ok }    
} 