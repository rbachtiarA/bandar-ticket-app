'use client'

import React, { useEffect, useRef, useState } from 'react'
import EventCard from '../eventCard'
import { ICategory } from '@/app/interfaceType'
import Image from 'next/image'


export default function CategoryContainer({category}: { category: ICategory }) {

  const containerRef = useRef<HTMLInputElement>(null)
  const [disableButton, setDisableButton] = useState('min')
  const handleScroll = (offset: number) => {
    if(containerRef.current) {
      const maxScroll = containerRef.current.scrollWidth - containerRef.current.clientWidth
      let nextScroll = containerRef.current.scrollLeft + offset          
      containerRef.current.scrollLeft = nextScroll
      console.log(maxScroll);
      
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

  return (
    <section className='relative w-screen md:w-[750px] md:mx-auto lg:w-[1000px] flex flex-col overflow-hidden'>
        <h1 className='text-lg font-extrabold text-center'>{category.name}</h1>

        <div ref={containerRef} id='concert-container' className='flex items-start w-full snap-x md:snap-none md:scroll-smooth overflow-x-scroll md:overflow-hidden'>
            
            {category.events.map((event, idx) => (
                <EventCard 
                key={idx}
                eventTitle={event.title}
                eventImg={event.img}
                eventDate={event.date}
                eventLocation={event.location}
                />
            ))}
        </div>
        
        {disableButton !== 'min' && <button onClick={() => handleScroll(-(250))} className='absolute hidden md:block p-2 left-0 top-1/3 shadow-md bg-slate-100/50 hover:bg-slate-500/50 text-5xl rounded-full'>
            <Image
            src={'/ico-prev.svg'}
            alt={'prev button'}
            width={24}
            height={24}
            />
        </button>}
        {disableButton !== 'max' && <button onClick={() => handleScroll(250)} className='absolute hidden md:block p-2 right-0 top-1/3 shadow-md bg-slate-100/50 hover:bg-slate-500/50 text-5xl rounded-full'>
            <Image
            src={'/ico-next.svg'}
            alt={'next button'}
            width={24}
            height={24}
            />
        </button>}
        

</section>
  )
}
