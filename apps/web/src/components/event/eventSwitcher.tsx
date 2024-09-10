'use client'
import React, { useState } from 'react'
import TicketForm from '../ticket/ticketForm';
import { ITicketType } from '@/app/interfaceType';
import TicketCard from '../ticket/ticketCard';

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
    <div className='h-full'>
            <div className='sticky top-0 flex bg-slate-200 [&_button]:border-x-2 [&_button]:border-black '>
              <button onClick={() => handleTab('desc')} className='w-1/3 hover:underline'>Description</button>
              <button onClick={() => handleTab('ticket')} className='w-1/3 hover:underline'>Ticket</button>
              <button onClick={() => handleTab('Discount')} className='w-1/3 hover:underline'>Discount</button>
            </div>

            {
            switcher === 'desc' && 
            <div>
              <p>{description}</p>
            </div>
            }

            {
            switcher === 'ticket' && 
            <div>
                {
                  isAdmin && 
                  <div className='flex justify-center w-full my-2'>
                    <button className='btn-primary' onClick={() => handleAdminForm('ticket')}>Add Ticket Type</button>
                  </div>
                }

                <div className='w-full border-b-2 border-t-2'>
                  <p className='text-center font-bold text-lg my-4'>Ticket List</p>
                </div>
                
                { ticket.length === 0 && <p className='text-red-500'>There is no ticket available on this event right now</p> }
                <div className='flex flex-col gap-4 mt-4'>
                  {
                    ticket.length !==0 && 
                    ticket.map((ticket, idx) => (
                      <TicketCard key={idx} ticket={ticket} />
                    )) 
                  }
                </div>
            </div>
            }
            
            {
              isAdmin && formType ==='ticket' && 
              <TicketForm handleFormClose={handleAdminFormClose} eventId={eventId}/>
            }

        </div>
  )
}
