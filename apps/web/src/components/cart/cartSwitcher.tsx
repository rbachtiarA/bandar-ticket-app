import { ICart } from "@/type/cart";
import { ITicketType } from "@/type/ticket";
import CartCard from "./cartCard";
import { useMemo, useState } from "react";
import DiscountCart from "../discount/discountCart";
import { IDiscountType } from "@/type/discount";
import { toast } from "react-toastify";

export default function CartSwitcher({ cart, ticket, userId, handleRemoveCart, handleTransaction, eventId }: { eventId:number, cart:ICart[], ticket:ITicketType[], userId:number, handleRemoveCart:any, handleTransaction:any }) {
  const [discount, setDiscount] = useState<IDiscountType>()
  const sumCart = useMemo(() => {
    return cart.reduce((prev, curr)=> prev + curr.totalPrice, 0)
  }, [cart])
  const discountCart = useMemo(() => {
    if(discount) {
      if(discount.cutType === 'NOMINAL') {
        return discount.cut
      } else if(discount.cutType === 'PERCENTAGE') {
        return sumCart*(discount.cut/100)
      } else {
        return 0
      }
    } else {
      return 0
    }
  }, [discount])
  const totalItemCart = useMemo(() => {
    return cart.reduce((prev, curr) => prev + curr.quantity, 0)
  }, [cart])

  const IDR = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR'
  })

  const discountValid = (discount: IDiscountType) => {    
    console.log(sumCart <= discount.minPrice);
    
    if(totalItemCart < discount.minQuantity) {
      return toast.error(`need atleast ${discount.minQuantity} ticket in cart`)
    } else if(sumCart < discount.minPrice){
      return toast.error(`need atleast ${IDR.format(discount.minPrice)} total price`)
     } else {
      setDiscount(discount)
    }
      
  }
  return (
    <div>
        <div className='hidden md:grid grid-cols-5 [&_h1]:text-center [&_h1]:font-semibold py-2 border-b-2'>
        <h1>Name</h1>
        <h1>Ticket Price</h1>
        <h1>Quantity</h1>
        <h1>Total Price</h1>
        </div>
        {cart.length === 0 && <p className='text-red-500 p-2 border-y-2'>Cart is empty please choose ticket from ticket tab</p>}
        {
        cart.length !== 0 && 
        <div className='flex flex-col gap-4 mt-4'>
            {cart.map((cart, idx) => (
            <CartCard key={idx} ticket={ticket} cart={cart} handleRemoveCart={handleRemoveCart} />
            ))}
            <DiscountCart eventId={eventId} discountValid={discountValid}/>

            <div className="flex flex-row md:flex-col">
              
              <div className="w-full grid md:grid-cols-5 text-center">
                <h1 className="md:col-start-3 md:col-end-4 font-bold">All total price : </h1>
                <h1 className="">{IDR.format(sumCart)}</h1>
              </div>
              {
                discount &&
                <div className="w-full grid md:grid-cols-5 text-center">
                  <h1 className="md:col-start-3 md:col-end-4 font-bold">After discount : </h1>
                  <h1 className="">{IDR.format(sumCart-discountCart)}</h1>
                  <h1>{`(-${IDR.format(discountCart)})`}</h1>
                </div>
              }
            </div>

            <div className='flex justify-center'>
            <button onClick={() => handleTransaction(userId, cart, {id: discount?.id || 0, totalCut:discountCart})} className='btn-primary-ry'>Transaksi</button>
            </div>
        </div>
        }
    </div>
  )
}
