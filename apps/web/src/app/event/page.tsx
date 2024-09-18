import EventFilter from '@/components/event/eventFilter'
import { getProvince } from '@/lib/backend'
import { IProvince } from '@/type/province'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Event | Bandar Tiket',
  description: 'Bandar tiket e-commerce for buy ticket or share your event to be acknoledge to our visitor',
};

export default async function page() {
  const provinceData: IProvince[] = await getProvince()  
  return (
    <div>
      <EventFilter provinceData={provinceData}/>
    </div>
  )
}
