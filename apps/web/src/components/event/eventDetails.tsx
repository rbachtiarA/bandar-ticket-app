import { IEvent } from '@/type/event';
import EventSwitcher from './eventSwitcher'
import { ITicketType } from '@/type/ticket';
import Image from 'next/image';
import { IDiscountType } from '@/type/discount';

export default function EventDetails({ event, ticket, discount, isAdmin, user }: {event:IEvent, ticket: ITicketType[], discount: IDiscountType[], isAdmin: Boolean, user:{ id:number, role:string }}) {

    const date_now = new Date()
    const date_start = new Date(event.date_start)
    const date_end = new Date(event.date_end)
    let isPastEvent = false;
    if(date_start < date_now ) {
        isPastEvent = true
    }
    
  return (
    <div className='flex flex-col w-full lg:w-2/3'>
        <div className='pb-2 mb-2 border-dashed border-b-2'>
            <div>
            <h1 className='font-bold text-xl'>{event.name}</h1>
            </div>
            <div className='flex gap-2'>
                <Image 
                    src={'/ico-date-event.svg'}
                    alt={'date icon'}
                    width={16}
                    height={16}
                />
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
            <div className='flex gap-2'>
                <Image 
                    src={'/ico-location-event.svg'}
                    alt='location icon'
                    width={16}
                    height={16}
                />
                <h2 className='text-slate-600'>{event.location}, {event.city.name}, {event.city.province.name}</h2>
            </div>
        </div>

        <EventSwitcher description={event.description} eventId={event.id} ticket={ticket} discount={discount} isPastEvent={isPastEvent} isAdmin={isAdmin} user={user}/>
    </div>
  )
}
