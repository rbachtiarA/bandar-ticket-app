import { IDiscountType } from "@/type/discount";
import DiscountCard from "./discountCard";

export default function DiscountSwitcher({ isAdmin, handleAdminForm, discount }: { isAdmin: Boolean, discount:IDiscountType[], handleAdminForm: any }) {
  return (
    <div>
        {
        isAdmin && 
        <div className='flex justify-center w-full my-2'>
            <button className='btn-primary-ry' onClick={() => handleAdminForm('discount')}>Add Discount Type</button>
        </div>
        }

        <div className='w-full border-b-2 border-t-2'>
        <p className='text-center font-bold my-4'>Discount List</p>
        {
            discount.length !==0 && 
            discount.map((discount) => (
            <DiscountCard key={discount.id} discount={discount}/>
            )) 
        }
        </div>
    </div>
  )
}
