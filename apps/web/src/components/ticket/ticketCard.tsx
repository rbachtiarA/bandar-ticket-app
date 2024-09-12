import { ITicketType } from '@/app/interfaceType'
import React, { useContext, useRef } from 'react'
import { toast } from 'react-toastify'

export default function TicketCard({ ticket, isPastEvent, handleAddCart }: {ticket: ITicketType, isPastEvent: Boolean, handleAddCart:any}) {
    const quantityRef = useRef<HTMLInputElement>(null)
    const IDR = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR'
      })
    const handlePastEvent = () => {
        toast.error('Event already over')
    }
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
        {
            isPastEvent ? 
            <div className='w-1/5 flex justify-center items-center'>
                <button className='btn-warning' onClick={handlePastEvent}>Beli Tiket</button>
            </div>    
            :
            <div className='w-1/5 flex justify-center items-center'>
                <input type="number" className='w-10' defaultValue={1} min={1} ref={quantityRef}/>
                <button 
                    className='btn-primary' 
                    onClick={() => {
                        handleAddCart(Number(quantityRef.current?.value), ticket.id,Number(ticket.price), ticket.price*Number(quantityRef.current?.value))
                }}>
                    Beli Tiket
                </button>
            </div>
        }
    </div>
  )
}
