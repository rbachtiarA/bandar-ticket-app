import { ITicketType } from '@/app/interfaceType'
import React, { useContext } from 'react'

export default function TicketCard({ ticket }: {ticket: ITicketType}) {
    const IDR = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR'
      })
  return (
    <div key={ticket.id} className='bg-slate-100 flex justify p-2'>
        <div className='w-1/5 flex justify-center items-center p-2'>
            <h1>{ticket.name}</h1>
        </div>
        <div className='w-3/5 p-2'>
            <h2>{ticket.description}</h2>
            <h2><b>Price: </b>{IDR.format(ticket.price)}</h2>
            <h3><b>Quota: </b>{ticket.quota} ticket left</h3>
        </div>

        <div className='w-1/5 flex justify-center items-center'>
            <button className='btn-primary'>Beli Tiket</button>
        </div>
    </div>
  )
}
