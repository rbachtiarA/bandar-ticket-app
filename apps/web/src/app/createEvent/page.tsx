
import EventFormik from '@/components/event/eventFormik'
import { getProvince, verifyRole } from '@/lib/backend'
import { getToken } from '@/lib/server'
import { Metadata } from 'next';
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Create Event | Bandar Tiket',
  description: 'Bandar tiket e-commerce for buy ticket or share your event to be acknoledge to our visitor',
};

export default async function page() {
    const province: {id: number, name:string, cities: { id: number, name: string }[]}[] = await getProvince()    
    // const user = { id: 2, role: 'ORGANIZER' }
    const token = await getToken()
    let id, role
    if(token) {
      const verifiedUser = await verifyRole(token)
      if(verifiedUser.status !== 'error') {
        id = verifiedUser.userId
        role = verifiedUser.userRole
      }
    }
    
  return (
    <div>
        { !(role === 'ORGANIZER') && <h1 className='text-red-400'>Sorry you dont have authorized, please browse our event <Link href={'/event'} className='text-blue-500 hover:text-blue-800 hover:underline'>here</Link></h1> }
        { role === 'ORGANIZER' && <EventFormik mainData={ province } user={{id, role}}/>}
    </div>
  )
}
