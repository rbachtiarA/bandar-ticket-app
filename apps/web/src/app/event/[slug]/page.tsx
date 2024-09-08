import EventSwitcher from '@/components/event/eventSwitcher';
import { getEventSlug } from '@/lib/event'
import Image from 'next/image';
import React, { useState } from 'react'

export default async function page({ params }: { params: { slug: string } }) {
  const { name, event, ticket  } = await getEventSlug(params.slug)
  console.log(event);
  console.log(ticket);
  
  if(event === null) {
    return (
      <section>
        <div>
          <h1>ID NOT FOUND</h1>
        </div>
      </section>
    )
  }

  
  const date_start = await new Date(event.date_start)
  const date_end = await new Date(event.date_end)
  return (
    <section className='relative'>
      <div className='event-header p-4'>
        <div className='breadcrumbs'>

        </div>

        <div className='image-container w-screen md:w-[400px] h-[300px] md:h-[100%]'>
          <Image 
          src={event.img_poster}
          alt={`poster ${event.name}`}
          width={0}
          height={0}
          sizes='100vw'
          style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition:'bottom'}}
          />
        </div>

        <div className='info-container rounded-lg'>

          <div>
            <h1 className=''>{event.name}</h1>
          </div>

          <div>
            <h2>{ date_start.getTime() === date_end.getTime() ?
              `${date_start.toLocaleDateString('en-us', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })}` :
              `${date_start.toLocaleDateString('en-us', {
                
                day: 'numeric',
                month: 'short',
            })} - ${date_end.toLocaleDateString('en-us', {
              
              day: 'numeric',
              month: 'short',
              year: 'numeric'
          })} ` 
            }</h2>
          </div>

          <div>
            <h2>{event.location}, {event.city.name}, {event.city.province.name}</h2>
          </div>
        </div>

        <EventSwitcher description={event.description} eventId={event.id} ticket={ticket}/>

      </div>
    </section>
  )
}
