import EventFilter from '@/components/event/eventFilter'
import { getProvince } from '@/lib/backend'
import { IProvince } from '@/type/province'

export default async function page() {
  const provinceData: IProvince[] = await getProvince()  
  return (
    <div>
      <EventFilter provinceData={provinceData}/>
    </div>
  )
}
