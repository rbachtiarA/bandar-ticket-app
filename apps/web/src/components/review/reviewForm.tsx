import React from 'react'
import ReviewFormik from './reviewFormik'
import { IEvent } from '@/type/event'

export default function ReviewForm({ user, eventId }: { user: { id:number, role:string },eventId:number }) {
  return (
    <div className='border-2 border-slate-400 p-2'>
        <h1>Submit your experience for this event here</h1>
        <ReviewFormik user={user} eventId={eventId}/>
    </div>
  )
}
