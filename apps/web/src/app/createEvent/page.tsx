
import EventFormik from '@/components/event/eventFormik'
import { getProvince } from '@/lib/backend'


export default async function page() {
    const province: {id: number, name:string, cities: { id: number, name: string }[]}[] = await getProvince()    
    const isAdmin = true
  return (
    <div>
        { isAdmin && <EventFormik mainData={ province }/>}
    </div>
  )
}
