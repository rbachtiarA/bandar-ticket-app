'use client'
import { ErrorMessage, Field } from 'formik'
import React from 'react'

export default function FormProvinceCity({ mainData, provinceId, handleProvince }: { mainData: { id: number, name: string, cities: { id: number, name: string }[] }[], provinceId: number, handleProvince: any }) {
  return (
    <div className='flex gap-4 mt-4'>
        
        <div>
            <label htmlFor='eventProvince'>Event Province :</label>
            <Field as='select' id='eventProvince' name='eventProvince' className='bg-slate-200' onChange={(e: any) => handleProvince(e)} >
                {mainData.map((province) => (
                    <option key={province.id} value={province.id}>{province.name}</option>
                ))}
            </Field>
            <ErrorMessage name='eventProvince' component={'div'} className='text-red-600'/>
        </div>
        
        
        <div>
            <label htmlFor='eventCity'>Event City :</label>
            <Field as='select' id='eventCity' name='eventCity' className='bg-slate-200'>
                <option value='0'>-- City Name --</option>
                {mainData.filter((province) => province.id == provinceId).map((data) => (
                    data.cities.map((city) => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                    ))
                ))}
            </Field>
            <ErrorMessage name='eventCity' component={'div'} className='text-red-600'/>
        </div>
    </div>
  )
}
