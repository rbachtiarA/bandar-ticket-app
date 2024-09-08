
import EventFormik from '@/components/event/eventFormik'
import { getCity, getProvince } from '@/lib/backend'
import React, { FormEvent } from 'react'


export default async function page() {
    const province: {id: number, name:string, cities: { id: number, name: string }[]}[] = await getProvince()    
  return (
    <div>
        <EventFormik mainData={ province }/>
        
    </div>
  )
}
