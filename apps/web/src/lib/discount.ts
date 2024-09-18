import { PostDiscountType } from "@/type/discount"

export const postDiscount = async (data: PostDiscountType) => {
    console.log(data);
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}discount`, {
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