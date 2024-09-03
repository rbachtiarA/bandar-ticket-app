import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function EventCard({ eventId, eventImg, eventTitle, eventDate, eventLocation }: { eventId:number, eventImg: string, eventTitle: string, eventDate:Date, eventLocation:string }) {
  return (
    
      <Link href={`/event/${eventId}`} className='hover:shadow-[rgb(0,230,255)_0px_3px_0px_0px]'>
        <div
        className='flex flex-col w-[250px] justify-start snap-center
        md:snap-none md:first:ml-[0px] md:last:mr-[0px] px-[10px] py-2'
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
        
            <h2 className='font-extrabold'>{eventTitle}</h2>
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
            <p className='text-slate-500 text-sm'>{eventLocation}</p>
        </div>
      </Link>
  )
}
