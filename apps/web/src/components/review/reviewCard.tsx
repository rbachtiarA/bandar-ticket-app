import { IReview } from '@/type/review'
import React, { useState } from 'react'
import RatingStarRows from './ratingStarRows'

export default function ReviewCard({ review }: { review: IReview }) {
    const [show, setShow] = useState(false)
    const onClick = () => {
        setShow(!show)
    }
  return (
    <div className='grid grid-cols-6 bg-slate-200 p-4 items-center'>
        <RatingStarRows onClick={null} onMouseEnter={null} onMouseLeave={null} rating={review.rating} value={0}/>
        <p onClick={onClick} className={`${!review.review? 'text-slate-500':''} px-4 ${show? `line-clamp-none`:'line-clamp-1'} break-words col-span-4 transition ease-in-out delay-150`} >{ review.review? `${review.review}`: `User not give any review yet` }</p>
        <p>{review.customer.name}</p>
    </div>
  )
}
