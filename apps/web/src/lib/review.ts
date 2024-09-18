import { PostDiscountType } from "@/type/discount"
import { PostReview } from "@/type/review";

export const postReview = async (data: PostReview) => {    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}review`, {
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