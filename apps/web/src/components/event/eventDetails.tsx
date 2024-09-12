import { IEvent, ITicketType } from '@/app/interfaceType'
import Image from 'next/image'
import EventSwitcher from './eventSwitcher'

export default function EventDetails({ event, ticket }: {event:IEvent, ticket: ITicketType[]}) {

    const date_start = new Date(event.date_start)
    const date_end = new Date(event.date_end)
  return (
    <div className='flex flex-col w-full lg:w-2/3'>

        <div className='p-4'>
            <div>
            <h1 className='font-bold text-xl'>{event.name}</h1>
            </div>
            <div>
                <h2>{ date_start.getTime() === date_end.getTime() ?
                `${date_start.toLocaleDateString('en-us', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                })}` :
                `${date_start.toLocaleDateString('en-us', {
            
                    day: 'numeric',
                    month: 'short',
                })} - ${date_end.toLocaleDateString('en-us', {
            
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            })} `
                }</h2>
            </div>
            <div>
                <h2 className='text-slate-600'>{event.location}, {event.city.name}, {event.city.province.name}</h2>
            </div>
        </div>

        <EventSwitcher description={event.description} eventId={event.id} ticket={ticket}/>
    </div>
  )
}
