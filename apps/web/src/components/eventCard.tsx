import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function EventCard({ eventId, eventSlug, eventImg, eventTitle, eventDate, eventLocation, userName }: { eventId:number, eventSlug:string, eventImg: string, eventTitle: string, eventDate:Date, eventLocation:string, userName:string }) {
  return (
    
      <Link href={`/event/${eventSlug}`} className='hover:shadow-[rgb(0,230,255)_0px_3px_0px_0px]'>
        <div
        className='flex flex-col w-[250px] h-full justify-start snap-center
        md:snap-none md:first:ml-[0px] md:last:mr-[0px] px-[10px] py-2 text-sm'
        >
            <div id='img-c-1' className='content-center h-[320px] bg-slate-400 rounded-md'>
                <Image
                src={`${eventImg}`}
                alt={eventImg}
                width={0}
                height={0}
                sizes='100vw'
                style={{width: '100%', height: '100%'}}
                className='rounded-md'
                />
            </div>
        
            <h2 className='font-semibold'>{eventTitle}</h2>
            <p className=''>
            {
              `${eventDate.toLocaleDateString('en-us', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })} ` 
            }
            </p>
            <p className='text-slate-500 text-wrap overflow-hidden'>{eventLocation}</p>
            
            <div className='mt-auto border-t-[1px] border-slate-200'>
              <p>{userName}</p>
            </div>
        </div>
      </Link>
  )
}
