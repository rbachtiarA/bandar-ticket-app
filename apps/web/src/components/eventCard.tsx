import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function EventCard({ eventImg, eventTitle, eventDate, eventLocation }: { eventImg: string, eventTitle: string, eventDate:string, eventLocation:string }) {
  return (
    
      <Link href={'/'} className='hover:shadow-[rgb(0,230,255)_0px_3px_0px_0px]'>
        <div
        className='flex flex-col w-[250px] justify-start snap-center
        md:snap-none md:first:ml-[0px] md:last:mr-[0px] px-[10px] py-2'
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
      </Link>
  )
}
