import EventFilter from '@/components/event/eventSearch'
import { getProvince } from '@/lib/backend'
import React from 'react'
import { IProvince } from '../interfaceType'

export default async function page() {
  const provinceData: IProvince[] = await getProvince()  
  return (
    <div>
      <EventFilter provinceData={provinceData}/>
    </div>
  )
}
