import Switcher from '@/components/event/switcher';
import { getEventSlug } from '@/lib/event'
import Image from 'next/image';
import React, { useState } from 'react'

export default async function page({ params }: { params: { slug: string } }) {
  const { name, data  } = await getEventSlug(params.slug)
  if(data === null) {
    return (
      <section>
        <div>
          <h1>ID NOT FOUND</h1>
        </div>
      </section>
    )
  }

  
  const date_start = new Date(data.date_start)
  const date_end = new Date(data.date_end)
  return (
    <section>
      <div className='event-header p-4'>
        <div className='breadcrumbs'>

        </div>

        <div className='image-container w-screen md:w-[400px] h-[300px] md:h-[100%]'>
          <Image 
          src={data.img_poster}
          alt={`poster ${data.name}`}
          width={0}
          height={0}
          sizes='100vw'
          style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition:'bottom'}}
          />
        </div>

        <div className='info-container rounded-lg'>

          <div>
            <h1 className=''>{data.name}</h1>
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
            <h2>{data.location}, {data.city.city}, {data.city.province.province}</h2>
          </div>
        </div>

        <Switcher />

      </div>
    </section>
  )
}
