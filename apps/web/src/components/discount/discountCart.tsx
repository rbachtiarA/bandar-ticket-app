import { getDiscountByCode } from '@/lib/discount'
import { IDiscountType } from '@/type/discount'
import React, { useEffect, useRef, useState } from 'react'

export default function DiscountCart({ eventId, discountValid }: { eventId: number, discountValid:any }) {
    const discountSearch = useRef<HTMLInputElement>(null)
    const [code, setCode] = useState('')
    const [discount, setDiscount] = useState<IDiscountType>()
    const getData = async () => {
        const discount = await getDiscountByCode(code, eventId)
        setDiscount(discount.result)
    }

    const onChange = () => {
        setCode(discountSearch.current?.value!)
    }

    useEffect(() => {
        if(code.length > 5) {
            getData()
        } else {
            setDiscount(undefined)
        }
    }, [code])
  return (
    <div>
        <p className='font-bold'>Insert code below here for extra cut price</p>
        <div className='flex gap-2 items-center'>
            <input ref={discountSearch} type="text" className='bg-slate-100 px-2 border-2 border-orange-400' onChange={onChange}/>
            <button className='btn-primary-ry' onClick={() => discountValid(discount)}>Apply</button>
            <span className='ml-2 text-green-500'>{discount?.name}</span>
        </div>

    </div>
  )
}
