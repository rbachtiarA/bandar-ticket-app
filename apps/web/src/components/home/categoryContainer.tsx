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
        
  // section width desktop need to be multiplier of offset handleScroll (ex: handleScroll offset = 200px, container widht should be 200/400/800 px etc ) 
  // 
  return (
    <section className='relative w-screen md:w-[750px] md:mx-auto lg:w-[1000px] flex flex-col overflow-hidden'>
        <h1 className='text-lg font-extrabold text-center'>{category.name}</h1>

        <div ref={containerRef} id='concert-container' 
        className='grid py-2
        snap-x pl-[calc(50vw-110px)] pr-[calc(50vw-110px)] overflow-x-scroll 
        md:snap-none md:px-0 md:scroll-smooth md:overflow-hidden containerScroll-hidden'
        style={{gridTemplateColumns: `repeat(${category.events.length}, 250px)`}}>
            
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

        <button></button>
        

</section>
  )
}
