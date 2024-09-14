'use client'
import { useState } from 'react'
import TicketForm from '../ticket/ticketForm';
import { ICart, } from '@/type/cart';
import { ITicketType } from '@/type/ticket';
import TicketCard from '../ticket/ticketCard';
import { toast } from 'react-toastify';
import CartCard from '../ticket/cartCard';
import { postTransaction } from '@/lib/backend';
import { useRouter, useSearchParams } from 'next/navigation';

export default function EventSwitcher({ description, eventId, ticket, isPastEvent }: { description: string, eventId: number,ticket: ITicketType[], isPastEvent: Boolean }) {
    const isAdmin = true;
    const searchParams = useSearchParams()
    const queryTabs = searchParams.get('tab')
    const [switcher, setSwitcher] = useState(queryTabs || 'desc')
    const [formType, setFormType] = useState('none')
    const [cart, setCart] = useState<ICart[]>([])
    const router = useRouter()
    const userId = 2
    
    const handleTab = (condition: string) => {
        setSwitcher(condition)
        router.push(`?tab=${switcher}#tab-section`)
    }
    const handleAdminForm = (e: any) => {
      setFormType('ticket')
    }
    const handleAdminFormClose = () => {
      setFormType('none')
    }

    //handle add cart per quantity
    const handleAddCart = (quantity: number, ticketTypeId: number, price:number, totalPrice: number) => {
      const itemIdx = cart.findIndex((item) => item.ticketTypeId === ticketTypeId )
      
      if(itemIdx !== -1) {
        const newCart = cart
        newCart[itemIdx] = {quantity: cart[itemIdx].quantity+quantity, ticketTypeId: ticketTypeId, price: price, totalPrice: price*(cart[itemIdx].quantity+quantity)}
        setCart(newCart)
      } else {
        const newItem = {quantity, ticketTypeId, price, totalPrice}
        setCart([...cart, newItem])
      }      
      toast.success(`Add ${quantity} ${ticket.find((t) => t.id === ticketTypeId)?.name} to Cart`)
    }

    //handle remove cart per quantity
    const handleRemoveCart = (quantity:number, ticketType:number) => {
      const itemIdx = cart.findIndex((item) => item.ticketTypeId === ticketType)
      const newQuantity = cart[itemIdx].quantity - quantity
      
      if(newQuantity < 1) {
        const newCart = cart.filter((item) => item.ticketTypeId !== ticketType)
        setCart(newCart)
        toast.success(`Remove ${ticket.find((item) => item.id === ticketType)?.name} from Cart`)  
      } else {
        const newCart = cart
        newCart[itemIdx] = { quantity: newQuantity, ticketTypeId:cart[itemIdx].ticketTypeId, price:cart[itemIdx].price, totalPrice:cart[itemIdx].price*newQuantity }
        setCart([...newCart])
        toast.success(`Remove ${quantity} ${ticket.find((item) => item.id === ticketType)?.name} from Cart`)
      }

      console.log(cart);
    }

    //handle transaction, if ticket quota and cart quantity doenst match, error insufficent quantity
    const handleTransaction = async (userId:number, cart:ICart[]) => {
      try {
        const postData = {userId, cart}
        const data = await postTransaction(postData)
        if(data.status === 'error') throw `${data.msg}`
        console.log(data);
        
        setCart([])
        toast.success(data.msg)
        setSwitcher('ticket')
      } catch (error) {
        toast.error(error as string, {
          theme: 'colored',
          autoClose: 5000
        })
      }  
    }

    // useEffect(() => {
    //   // router.push(`?tab=${switcher}#tab-section`)
    // },[switcher])

  return (
    <div className='h-full ' id='tab-section'>
            <div className='sticky top-0 gap-1 flex flex-col  md:flex-row bg-slate-400 [&_button]:bg-slate-200 [&_button]:py-1 md:[&_button]:w-1/4' >
              <button onClick={() => handleTab('desc')} className={`hover:underline ${switcher === 'desc'? 'font-bold pointer-events-none': ''}`}>Description</button>
              <button onClick={() => handleTab('ticket')} className={`hover:underline ${switcher === 'ticket'? 'font-bold pointer-events-none': ''}`}>Ticket</button>
              <button onClick={() => handleTab('discount')} className={`hover:underline ${switcher === 'discount'? 'font-bold pointer-events-none': ''}`}>Discount</button>
              <button onClick={() => handleTab('cart')} className={`hover:underline ${switcher === 'cart'? 'font-bold pointer-events-none': ''}`}>Cart{cart.length !== 0? `(${cart.length})` : ''}</button>
            </div>

          <div className='text-sm md:text-md lg:text-lg'>
          {
            switcher === 'desc' && 
            <div>
              <p>{description}</p>
            </div>
            }

            {
            switcher === 'ticket' && 
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
            }

            {
              switcher === 'cart' && 
              <div>
                {cart.length === 0 && <p className='text-red-500'>Cart is empty please choose ticket from ticket tab</p>}
                {

                  cart.length !== 0 && 
                  <div className='flex flex-col gap-4 mt-4'>
                    {cart.map((cart, idx) => (
                      <CartCard key={idx} ticket={ticket} cart={cart} handleRemoveCart={handleRemoveCart} />
                    ))}
                    <div className='flex justify-center'>
                      <button onClick={() => handleTransaction(userId, cart)} className='btn-primary-ry'>Transaksi</button>
                    </div>

                  </div>
                }
              </div>
            }

            {
              isAdmin && formType ==='ticket' && 
              <TicketForm handleFormClose={handleAdminFormClose} eventId={eventId}/>
            }
            <div>
              <h1>
                debug
              </h1>
              <p>Cart State: {cart.length}</p>
            </div>
          </div>
            
        </div>
  )
}
