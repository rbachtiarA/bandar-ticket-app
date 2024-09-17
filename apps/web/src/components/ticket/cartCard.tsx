import { ICart } from '@/type/cart'
import { ITicketType } from '@/type/ticket'
import React, { useRef } from 'react'

export default function cartCard({ cart, ticket, handleRemoveCart }: { cart: ICart, ticket:ITicketType[], handleRemoveCart: any }) {
    const IDR = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR'
      })
    const quantityRef = useRef<HTMLInputElement>(null)
    return (
        <div className='
        grid grid-cols-3 
        md:grid-cols-[1fr_3fr_1fr] 
        bg-slate-100 
        md:[&_h2]:text-center md:[&_h2]:p-2 p-2
        md:[&_h1]:hidden [&_h1]:font-semibold
        '>
            <div className='flex justify-center items-center p-2'>
                <h2>{ticket.find((t) => t.id === cart.ticketTypeId)?.name}</h2>
            </div>

            <div className='grid grid-rows- md:grid-cols-3 w-full'>
                <div className='flex flex-col md:justify-center md:items-center'>
                    <h1>Price :</h1>
                    <h2>{IDR.format(cart.price)}</h2>
                </div>
                <div className='flex flex-col md:justify-center md:items-center'>
                    <h1>Qty :</h1>
                    <h2>{cart.quantity}</h2>
                </div>
                <div className='flex flex-col md:justify-center md:items-center'>
                    <h1>Total Price :</h1>
                    <h2>{IDR.format(cart.totalPrice)}</h2>
                </div>
            </div>

            <div className='flex flex-col-reverse xl:flex-row justify-center items-center'>
                <input type="number" className='md:w-10' defaultValue={1} min={1} max={cart.quantity} ref={quantityRef}/>
                <button className='btn-warning-ry' onClick={() => handleRemoveCart(quantityRef.current?.value, cart.ticketTypeId)}> 
                    Remove
                </button>
            </div>
        
    </div>
    )
}
