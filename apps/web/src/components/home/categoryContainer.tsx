import React from 'react'
import EventCard from '../eventCard'

export default function categoryContainer({catagory, events}: { catagory: string, events: [] }) {
  return (
    <section className='px-4 w-screen md:w-4/5 flex flex-col overflow-hidden'>
        <h1 className='text-lg font-extrabold text-center'>{catagory}</h1>

        <div id='concert-container' className='flex gap-4 snap-x md:mx-auto overflow-x-scroll'>
            
            {events.map((event: { title: string, img: string, date: string, location: string}) => (
                <EventCard 
                eventTitle={event.title}
                eventImg={event.img}
                eventDate={event.date}
                eventLocation={event.location}
                />
            ))}
                      

        </div>

</section>
  )
}
