'use client'
import React, { useState } from 'react'
import TicketForm from '../ticket/ticketForm';
import { ITicketType } from '@/app/interfaceType';

export default function EventSwitcher({ description, eventId, ticket }: { description: string, eventId: number,ticket: ITicketType[] }) {
    const isAdmin = true;
    const [switcher, setSwitcher] = useState('desc')
    const [formType, setFormType] = useState('none')
    const handleTab = (condition: string) => {
        setSwitcher(condition)
    }
    const handleAdminForm = (e: any) => {
      setFormType('ticket')
    }
    const handleAdminFormClose = () => {
      setFormType('none')
    }
    
  return (
    <div className='w-full'>
            <div className='flex bg-slate-200 '>
              <button onClick={() => handleTab('desc')} className='w-1/3 hover:underline'>Description</button>
              <button onClick={() => handleTab('ticket')} className='w-1/3 hover:underline'>Ticket</button>
              <button onClick={() => handleTab('Discount')} className='w-1/3 hover:underline'>Discount</button>
            </div>

            {switcher === 'desc' && 
            <div>
              <p>{description}</p>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam rerum id voluptates obcaecati facere! Quaerat error porro suscipit? Placeat unde ipsum quas eum, facere quidem veritatis quasi laboriosam necessitatibus deserunt optio, voluptatum culpa vero incidunt, repudiandae nostrum possimus tenetur sit.</p>
            </div>}
            {switcher === 'ticket' && 
            <div>
                {
                  isAdmin && 
                  <div className='flex justify-center w-full'>
                    <button className='px-4 py-2 rounded-lg bg-cyan-200 hover:text-white hover:bg-cyan-600' onClick={() => handleAdminForm('ticket')}>Add Ticket Type</button>
                  </div>
                }
                <p>Ticket List</p>
                { ticket.length === 0 && <p className='text-red-500'>There is no ticket available on this event right now</p> }
                {
                  ticket.length !==0 && 
                  ticket.map((ticket) => (
                    <div key={ticket.id}>
                      <h1>{ticket.name}</h1>
                      <h2>{ticket.description}</h2>
                      <h2>{ticket.price}</h2>
                      <h3>{ticket.quota}</h3>
                    </div>
                  )) 
                }
            </div>}
                {
                  isAdmin && formType ==='ticket' && 
                  <TicketForm handleFormClose={handleAdminFormClose} eventId={eventId}/>
                }

        </div>
  )
}
