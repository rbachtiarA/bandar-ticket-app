import { IEvent } from '@/type/event'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function SearchbarCard({ event, handleClickLink }: { event: IEvent, handleClickLink: any }) {
  return (
    <Link href={`/event/${event.slug}`} onClick={handleClickLink} 
    className='hover:bg-slate-200 w-full px-2 py-1 flex gap-4'>
        <Image 
            src={event.img_poster}
            alt={event.name}
            width={30}
            height={90}
        />
        <div>
            <h1 className='font-semibold'>{event.name}</h1>
            <h2>{event.location}, {event.city.province.name}</h2>
        </div>
    </Link>
  )
}
