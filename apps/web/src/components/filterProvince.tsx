'use client'
import { IProvince } from '@/app/interfaceType'
import React from 'react'

export default function FilterProvince({ provinceData, handleChange, provinceId }: {provinceData: IProvince[], handleChange: any, provinceId:string}) {   
    
    return (
        <div>
            <select defaultValue={provinceId !== ''? Number(provinceId): ''} name="provinceId" id='provinceId' className='bg-slate-200 w-full' onChange={(e)=>handleChange(e)}>
                <option value={''}>-- Province Location --</option>
                {provinceData.map((province) => (
                    <option key={province.id} value={Number(province.id)}>{province.name}</option>
                ))}
            </select>

        </div>
  )
}