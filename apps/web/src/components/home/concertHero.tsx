import React from 'react'
import EventCard from '../eventCard'

export default function ConcertHero() {
  return (
    <section className='relative px-4 w-screen flex flex-col overflow-hidden'>
        
        <h1 className='text-lg font-extrabold text-center'>Concert</h1>

        <div id='concert-container' className='flex gap-4 snap-x overflow-x-auto'>

            <EventCard 
            eventTitle='Live Music 2024'
            eventImg='Event Image'
            eventDate='Jan 01, 2024'
            eventLocation='Stadion GBK, Jakarta'
            />
            <EventCard 
            eventTitle='Live Music 2024'
            eventImg='Event Image'
            eventDate='Jan 01, 2024'
            eventLocation='Stadion GBK, Jakarta'
            />
            <EventCard 
            eventTitle='Live Music 2024'
            eventImg='Event Image'
            eventDate='Jan 01, 2024'
            eventLocation='Stadion GBK, Jakarta'
            />
            <EventCard 
            eventTitle='Live Music 2024'
            eventImg='Event Image'
            eventDate='Jan 01, 2024'
            eventLocation='Stadion GBK, Jakarta'
            />
            <EventCard 
            eventTitle='Live Music 2024'
            eventImg='Event Image'
            eventDate='Jan 01, 2024'
            eventLocation='Stadion GBK, Jakarta'
            />
            <EventCard 
            eventTitle='Live Music 2024'
            eventImg='Event Image'
            eventDate='Jan 01, 2024'
            eventLocation='Stadion GBK, Jakarta'
            />
            <EventCard 
            eventTitle='Live Music 2024'
            eventImg='Event Image'
            eventDate='Jan 01, 2024'
            eventLocation='Stadion GBK, Jakarta'
            />
            <EventCard 
            eventTitle='Live Music 2024'
            eventImg='Event Image'
            eventDate='Jan 01, 2024'
            eventLocation='Stadion GBK, Jakarta'
            />
            <EventCard 
            eventTitle='Live Music 2024'
            eventImg='Event Image'
            eventDate='Jan 01, 2024'
            eventLocation='Stadion GBK, Jakarta'
            />

            

        </div>

    </section>
  )
}
