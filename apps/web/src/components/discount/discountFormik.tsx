import { Form, Formik } from "formik";
import FormikControl from "../formikControl/formikControl";
import * as yup from 'yup';
import { postTicketType } from "@/lib/ticket";
import { toast } from "react-toastify";
import { postDiscount } from "@/lib/discount";

const createDiscountSchema =  yup.object().shape({
    discountName: yup.string().required('Discount should have name'),
    discountDescription: yup.string(),
    discountNominal: yup.number(),
    discountPercent: yup.number(),
    discountReqQuantity: yup.number(),
    discountReqPrice: yup.number(),
    discountLimitPrice: yup.number(),
    discountDateExpire: yup.date().required("Discount must have expire date"),
})

export default function DiscountFormik({eventId, handleClose}: {eventId: number, handleClose: any}) {
  return (
    <Formik
        initialValues={{
          discountName: '',
          discountDescription: '',
          discountNominal: 0,
          discountPercent: 0,
          discountReqQuantity: 0,
          discountReqPrice: 0,
          discountLimitPrice: 0,
          discountDateExpire: `${(new Date()).toISOString().split('T')[0]}`,
          eventId: eventId
        }}
        validationSchema={createDiscountSchema}
        onSubmit={async (values, action) => {
          try {
            console.log('submit discount');
            
            const {result, ok} = await postDiscount(values)
            if(!ok) throw result.msg
            toast.success(result.msg)
            action.resetForm()
            handleClose()
          } catch (error) {
            toast.error(error as string)
          }
        }}
        >
          {
            () => {
              return (
                <Form className="flex flex-col justify-center">
                  <FormikControl control='input' name='discountName' label='Discount Name :' placeholder="Enter your discount name here, ex: Weekend Deals, Buy 1 Get 1" className='w-full bg-slate-200 px-2 py-1'/>
                  <FormikControl control='textarea' name='discountDescription' label='Discount Description :' placeholder='Enter your discount details here' className='w-full bg-slate-200 px-2 py-1'/>
                  <FormikControl control='number' min={0} name='discountNominal' label='Discount Price Cut (IDR):' placeholder='Price in IDR' className='w-full bg-slate-200 px-2 py-1'/>
                  <FormikControl control='number' min={0} name='discountPercent' label='Discount Percent :' placeholder='discount in percent' className='w-full bg-slate-200 px-2 py-1'/>
                  <FormikControl control='number' min={0} name='discountLimitPrice' label='Max nominal from discount percent :' placeholder='ex: IDR 100.000 40% discount but max at IDR 30.000' className='w-full bg-slate-200 px-2 py-1'/>
                  <FormikControl control='number' min={0} name='discoutReqQuantity' label='Requirement item quantity:' placeholder='requirements total quantity' className='w-full bg-slate-200 px-2 py-1'/>
                  <FormikControl control='number' min={0} name='discountReqPrice' label='Requirement total price (IDR):' placeholder='requirements total price' className='w-full bg-slate-200 px-2 py-1'/>
                  <FormikControl control='dateTime' name='discountDateExpire' label='Discount expire time:' placeholder='expire time' className='w-full bg-slate-200 px-2 py-1'/>
                  <div className="flex justify-center">
                    <button type="submit" className="mt-4 px-4 py-2 rounded-lg bg-cyan-200 hover:bg-cyan-600 hover:text-white">Submit</button>
                  </div>
                </Form>   
              )
            }
          }
        </Formik>
  )
}
