'use client'
import { useState } from 'react'
import TicketForm from '../ticket/ticketForm';
import { ICart, } from '@/type/cart';
import { ITicketType } from '@/type/ticket';
import TicketCard from '../ticket/ticketCard';
import { toast } from 'react-toastify';
import CartCard from '../cart/cartCard';
import { postTransaction } from '@/lib/backend';
import { useRouter, useSearchParams } from 'next/navigation';
import ModalWrapper from '../modal';
import TicketFormik from '../ticket/ticketFormik';
import DiscountFormik from '../discount/discountFormik';
import { IDiscountType } from '@/type/discount';
import DiscountCard from '../discount/discountCard';
import CartSwitcher from '../cart/cartSwitcher';
import DiscountSwitcher from '../discount/discountSwitcher';
import TicketSwitcher from '../ticket/ticketSwitcher';
import ReviewForm from '../review/reviewForm';
import { IUser } from '@/type/user';
import { getUserData } from '@/lib/user';
import { getToken } from '@/lib/server';
import { useAppSelector } from '@/app/redux/hooks';
import ReviewCard from '../review/reviewCard';
import ReviewSwitcher from '../review/reviewSwitcher';
import { IReview } from '@/type/review';

export default function EventSwitcher({ description, eventId, ticket, discount, reviews, isPastEvent, isAdmin, user }: { description: string, eventId: number,ticket: ITicketType[], reviews: IReview[], discount:IDiscountType[], isPastEvent: Boolean, isAdmin:Boolean, user:{ id:number, role:string } }) {

    const searchParams = useSearchParams()
    const queryTabs = searchParams.get('tab')
    const [switcher, setSwitcher] = useState(queryTabs || 'desc')
    const [formType, setFormType] = useState('none')
    const [usePoints, setUsePoints] = useState(false);
    const [cart, setCart] = useState<ICart[]>([])
    const router = useRouter()

    const user = useAppSelector((state) => state.author)
  

    const isUserReviewed = reviews.findIndex((review) => review.customer.id === user.id) !== -1     
    

    
    const handleTab = (condition: string) => {
        setSwitcher(condition)
        router.push(`?tab=${condition}#tab-section`)
    }
    const handleAdminForm = (state:string) => {
      setFormType(state)
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
    }

    //handle transaction, if ticket quota and cart quantity doenst match, error insufficent quantity
    const handleTransaction = async (userId:number, cart:ICart[], discount:{ id:number, totalCut:number }) => {
      try {        
        if(!userId) throw 'You need to login before complete this action'

        const postData = {userId, cart, usePoints: false}
       
        console.log(postData);
        

        const data = await postTransaction(postData)
        if(data.status === 'error') throw `${data.msg}`        
        setCart([])
        toast.success(data.msg)
        setSwitcher('ticket')
        router.push(`?tab=ticket#tab-section`)
      } catch (error) {
        toast.error(error as string, {
          theme: 'colored',
          autoClose: 5000
        })
      }  
    }

  return (
    <div className='h-full' id='tab-section'>
            <div className='top-0 z-0 gap-1 flex flex-col mb-2 md:flex-row bg-slate-400 [&_button]:bg-slate-200 [&_button]:py-1 md:[&_button]:w-1/4' >
              <button onClick={() => handleTab('desc')} className={`hover:underline ${switcher === 'desc'? 'font-bold pointer-events-none': ''}`}>Description</button>
              <button onClick={() => handleTab('ticket')} className={`hover:underline ${switcher === 'ticket'? 'font-bold pointer-events-none': ''}`}>Ticket</button>
              <button onClick={() => handleTab('discount')} className={`hover:underline ${switcher === 'discount'? 'font-bold pointer-events-none': ''}`}>Discount</button>
              <button onClick={() => handleTab('cart')} className={`hover:underline ${switcher === 'cart'? 'font-bold pointer-events-none': ''}`}>Cart{cart.length !== 0? `(${cart.length})` : ''}</button>
              <button onClick={() => handleTab('review')} className={`hover:underline ${switcher === 'review'? 'font-bold pointer-events-none': ''}`}>Review</button>
            </div>

          <div className='text-sm md:text-md lg:text-lg'>
          {
            switcher === 'desc' && 
            <div>
              <p>{description}</p>
              {isPastEvent && <ReviewForm user={user} eventId={eventId} isUserReviewed={isUserReviewed}/>}
            </div>

          }

          {
            switcher === 'ticket' && 
            <TicketSwitcher isAdmin={isAdmin} ticket={ticket} isPastEvent={isPastEvent} handleAddCart={handleAddCart} handleAdminForm={handleAdminForm}/>
          }
          {
            switcher === 'discount' &&
            <DiscountSwitcher isAdmin={isAdmin} discount={discount} handleAdminForm={handleAdminForm}/>
          }
          {
            switcher === 'cart' && 
              <CartSwitcher cart={cart} ticket={ticket} handleRemoveCart={handleRemoveCart} handleTransaction={handleTransaction} userId={user.id} userPoints={user.points} usePoints={usePoints}/>

            
          }
          {
            switcher === 'review' && 
            <ReviewSwitcher reviews={reviews}/>

          }
          {
            isAdmin && formType ==='ticket' && 
            <ModalWrapper handleClose={handleAdminFormClose} title='Create Ticket'>
              <TicketFormik eventId={eventId} handleClose={handleAdminFormClose}/>
            </ModalWrapper>
          }
          {
            isAdmin && formType ==='discount' && 
            <ModalWrapper handleClose={handleAdminFormClose} title='Create Discount'>
              <DiscountFormik handleClose={handleAdminFormClose} eventId={eventId}/>
            </ModalWrapper>
          }
          </div>
            
        </div>
  )
}
