import { ICart, ITicketType } from '@/app/interfaceType'
import React, { useRef } from 'react'

export default function cartCard({ cart, ticket, handleRemoveCart }: { cart: ICart, ticket:ITicketType[], handleRemoveCart: any }) {
    const IDR = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR'
      })
    const quantityRef = useRef<HTMLInputElement>(null)
    return (
        <div className='bg-slate-100 flex md:flex-row flex-col [&_h1]:w-full justify p-2'>
            <div className='w-2/6 flex justify-center items-center p-2'>
                <h1>{ticket.find((t) => t.id === cart.ticketTypeId)?.name}</h1>
            </div>

            <div className='w-1/6 flex justify-center items-center p-2'>
                <h1>{IDR.format(cart.price)}</h1>
            </div>
            <div className='w-1/6 flex justify-center items-center p-2'>
                <h1>{cart.quantity}</h1>
            </div>
            <div className='w-1/6 flex justify-center items-center p-2'>
                <h1>{IDR.format(cart.totalPrice)}</h1>
            </div>

            <div className='w-1/6 flex flex-col-reverse md:flex-row justify-center items-center'>
                <input type="number" className='w-10' defaultValue={1} min={1} max={cart.quantity} ref={quantityRef}/>
                <button className='btn-warning-ry' onClick={() => handleRemoveCart(quantityRef.current?.value, cart.ticketTypeId)}> 
                    Remove
                </button>
            </div>
        
    </div>
    )
}
