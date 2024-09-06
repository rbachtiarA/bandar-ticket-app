'use client'
import React, { useState } from 'react'

export default function EventSwitcher({ description }: { description: string }) {
    const [switcher, setSwitcher] = useState('desc')
    const handleTab = (condition: string) => {
        setSwitcher(condition)
    }
  return (
    <div className='w-full'>
            <div className='flex bg-slate-200 '>
              <button onClick={() => handleTab('desc')} className='w-1/2 hover:underline'>Description</button>
              <button onClick={() => handleTab('ticket')} className='w-1/2 hover:underline'>Ticket</button>
            </div>

            {switcher === 'desc' && 
            <div>
              <p>{description}</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam rerum id voluptates obcaecati facere! Quaerat error porro suscipit? Placeat unde ipsum quas eum, facere quidem veritatis quasi laboriosam necessitatibus deserunt optio, voluptatum culpa vero incidunt, repudiandae nostrum possimus tenetur sit.</p>
            </div>}
            {switcher === 'ticket' && 
            <div>
                <p>Ticket List</p>
            </div>}


        </div>
  )
}
