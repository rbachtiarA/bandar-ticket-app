import { ITicketType } from "@/type/ticket";
import TicketCard from "./ticketCard";

export default function TicketSwitcher({isAdmin, isPastEvent, ticket, handleAdminForm, handleAddCart}: { isAdmin: Boolean, isPastEvent:Boolean, ticket:ITicketType[], handleAdminForm:any, handleAddCart:any }) {
  return (
    <div>
        {
            isAdmin && 
            <div className='flex justify-center w-full my-2'>
            <button className='btn-primary-ry' onClick={() => handleAdminForm('ticket')}>Add Ticket Type</button>
            </div>
        }

        <div className='w-full border-b-2 border-t-2'>
            <p className='text-center font-bold my-4'>Ticket List</p>
        </div>
        
        { ticket.length === 0 && <p className='text-red-500'>There is no ticket available on this event right now</p> }
        <div className='flex flex-col gap-4 mt-4'>
            {
            ticket.length !==0 && 
            ticket.map((ticket, idx) => (
                <TicketCard key={idx} ticket={ticket} isPastEvent={isPastEvent} handleAddCart={handleAddCart}/>
            )) 
            }
        </div>
    </div>
  )
}
