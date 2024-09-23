import { IReview } from '@/type/review'
import React from 'react'
import ReviewCard from './reviewCard'

export default function ReviewSwitcher({ reviews }: { reviews: IReview[] }) {    
    const overallReview = Math.round((reviews.reduce((prev, curr) => prev+curr.rating, 0)/reviews.length)*10)/10
    return (
    <div className='flex flex-col gap-2'>
        <div className='w-full border-b-2 border-t-2'>
            <p className='text-center font-bold my-4'>Review List</p>
        </div>
        <p className='font-semibold'>Overall Star : {overallReview}</p>
        {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
        ))}
    </div>
  )
}
