import Image from 'next/image'
import React from 'react'

export default function EventCard({ eventImg, eventTitle, eventDate, eventLocation }: { eventImg: string, eventTitle: string, eventDate:string, eventLocation:string }) {
  return (
    <div 
    className='flex flex-col flex-shrink-0 w-[250px] md:1/3 lg:w-1/4 justify-center snap-center 
    first:ml-[calc(50vw-110px)] last:mr-[calc(50vw-110px)] 
    md:snap-none md:first:ml-[0px] md:last:mr-[0px] px-[10px]'
    >
        <div id='img-c-1' className='content-center h-[320px] bg-slate-400 rounded-md'>
            <Image 
            src={`/${eventImg}`}
            alt={eventImg}
            width={0}
            height={0}
            sizes='100vw'
            style={{width: '100%', height: 'auto'}}
            />
        </div>
        
        <h2 className='font-extrabold'>{eventTitle}</h2>
        <p>{eventDate}</p>
        <p className='text-slate-500 break-'>{eventLocation}</p>
    </div>
  )
}
