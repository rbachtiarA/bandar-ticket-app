import React from 'react'

export default function EventCard({ eventImg, eventTitle, eventDate, eventLocation }: { eventImg: string, eventTitle: string, eventDate:string, eventLocation:string }) {
  return (
    <div className='flex flex-col justify-center snap-center first:ml-[calc(50vw-110px)] last:mr-[calc(50vw-110px)] md:first:mx-0 md:last:mr-0'>
        <div id='img-c-1' className='content-center h-[320px] w-[220px] bg-slate-400 rounded-md'>
            {eventImg}
        </div>
        
        <h2 className='font-extrabold'>{eventTitle}</h2>
        <p>{eventDate}</p>
        <p className='text-slate-500'>{eventLocation}</p>
    </div>
  )
}
