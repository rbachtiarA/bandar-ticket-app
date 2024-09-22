import React from 'react'
import ReviewFormik from './reviewFormik'
import { IReview } from '@/type/review'

export default function ReviewForm({ user, eventId, isUserReviewed }: { user: { id:number, role:string },eventId:number, isUserReviewed: boolean }) {
  return (
    <div className='border-2 border-slate-400 p-2'>
      {isUserReviewed ? 
        <h1>You already reviewed this event</h1>
      :
        <div>
          <p>{isUserReviewed}</p>
          <h1 className='font-semibold'>Submit your experience for this event here :</h1>
          <ReviewFormik user={user} eventId={eventId}/>
        </div>
      }
    </div>
  )
}
