
import EventFormik from '@/components/event/eventFormik'
import { getProvince } from '@/lib/backend'
import Link from 'next/link'


export default async function page() {
    const province: {id: number, name:string, cities: { id: number, name: string }[]}[] = await getProvince()    
    const user = { id: 2, role: 'ORGANIZER' }
  return (
    <div>
        { !(user.role === 'ORGANIZER') && <h1 className='text-red-400'>Sorry you dont have authorized, please browse our event <Link href={'/event'} className='text-blue-500 hover:text-blue-800 hover:underline'>here</Link></h1> }
        { user.role === 'ORGANIZER' && <EventFormik mainData={ province } user={ user }/>}
    </div>
  )
}
