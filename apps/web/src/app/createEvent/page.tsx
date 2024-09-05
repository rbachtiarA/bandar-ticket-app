import FormFormik from '@/components/event/formFormik'
import { getCity, getProvince } from '@/lib/backend'
import React, { FormEvent } from 'react'


export default async function page() {
    const province: {id: number, name:string, cities: { id: number, name: string }[]}[] = await getProvince()
    console.log(province);
        
    
  return (
    <div>
        <FormFormik mainData={ province }/>
        
    </div>
  )
}
