import { IDiscountType } from '@/type/discount'
import { ITicketType } from '@/type/ticket'
import React, { useContext, useRef } from 'react'
import { toast } from 'react-toastify'

export default function DiscountCard({ discount }: {discount: IDiscountType}) {
    const IDR = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR'
      })

    const handlePastEvent = () => {
        toast.error('Event already over')
    }

  return (
    <div className='bg-slate-100 flex justify p-2'>
        <div className='w-1/5 flex justify-center items-center p-2'>
            <h1>{discount.name}</h1>
        </div>
        <div className='w-3/5 p-2'>
            <h2>{discount.description}</h2>
        </div>        
    </div>
  )
}
