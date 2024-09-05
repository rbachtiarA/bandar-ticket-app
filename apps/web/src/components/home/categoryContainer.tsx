'use client'

import React, { useEffect, useRef, useState } from 'react'
import EventCard from '../eventCard'
import { ICategory, IEvent } from '@/app/interfaceType'
import Image from 'next/image'


export default function CategoryContainer({category: {name, data}}: { category: {name: string, data: IEvent[]} }) {
  const containerRef = useRef<HTMLInputElement>(null)
  const [disableButton, setDisableButton] = useState('min')
  const handleScroll = (offset: number) => {
    if(containerRef.current) {
      const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth
      let nextScroll = containerRef.current.scrollLeft + offset          
      containerRef.current.scrollLeft = nextScroll
      
      switch (nextScroll) {
        case 0:
          setDisableButton('min')
          break;
        case maxScroll:
          setDisableButton('max')
          break;
          
        default:
          setDisableButton('none')
          break;
      }
    }
  }
        
  // section width desktop need to be multiplier of offset handleScroll (ex: handleScroll offset = 200px, container widht should be 200/400/800 px etc ) 
  return (
    <section className='relative'>
        <div className='w-screen md:w-[750px] md:mx-auto lg:w-[1000px] flex flex-col overflow-hidden'>
          <h1 className='text-lg font-extrabold text-center'>{name}</h1>
          <div ref={containerRef} id='concert-container'
          className='grid py-2
          snap-x pl-[calc(50vw-110px)] pr-[calc(50vw-110px)] overflow-x-scroll
          md:snap-none md:px-0 md:scroll-smooth md:overflow-hidden containerScroll-hidden'
          style={{gridTemplateColumns: `repeat(${data.length}, 250px)`}}>
          
              {data.map((event) => (
                  <EventCard
                  key={event.id}
                  eventId = {event.id}
                  eventSlug = {event.slug}
                  eventTitle={event.name}
                  eventImg={event.img_poster}
                  eventDate={new Date(event.date_start)}
                  eventLocation={`${event.location}, ${event.city.province.name}`}
                  />
              ))}
          </div>
          
        </div>
        {
          disableButton !== 'min' 
          && data.length>4 
          && 
          <button onClick={() => handleScroll(-(250))} 
          className='absolute hidden md:block p-2 left-[23%] top-1/3 shadow-md bg-slate-200/90 hover:bg-slate-500/70 text-5xl rounded-full'>
              <Image
              src={'/ico-prev.svg'}
              alt={'prev button'}
              width={24}
              height={24}
              />
          </button>
        }
        {
          disableButton !== 'max' 
          && data.length>4 
          &&  
          <button onClick={() => handleScroll(250)} 
          className='absolute hidden md:block p-2 right-[23%] top-1/3 shadow-md bg-slate-200/90 hover:bg-slate-500/70 text-5xl rounded-full'>
              <Image
              src={'/ico-next.svg'}
              alt={'next button'}
              width={24}
              height={24}
              />
          </button>
        }

        <button></button>
        

</section>
  )
}
