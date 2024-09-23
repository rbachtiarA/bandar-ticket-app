import { Form, Formik } from "formik";
import FormikControl from "../formikControl/formikControl";
import * as yup from 'yup';
import { toast } from "react-toastify";
import { postDiscount } from "@/lib/discount";
import DiscountCutType from "./discountCutSelect";

const createDiscountSchema =  yup.object().shape({
    discountName: yup.string().required('Discount should have name'),
    discountDescription: yup.string(),
    discountCode: yup.string().required('Discount is required').min(6, 'Atleast length of code is 6 and unique'),
    discountCutType: yup.string().oneOf(['NOMINAL','PERCENTAGE']),
    discountCut: yup.number(),
    discountReqQuantity: yup.number(),
    discountReqPrice: yup.number(),
    discountDateExpire: yup.date().required("Discount must have expire date"),
})

export default function DiscountFormik({eventId, handleClose}: {eventId: number, handleClose: any}) {
  return (
    <Formik
        initialValues={{
          discountName: '',
          discountDescription: '',
          discountCode: '',
          discountCutType: 'NOMINAL',
          discountCut: 0,
          discountReqQuantity: 0,
          discountReqPrice: 0,
          discountLimit: 0,
          discountDateExpire: (new Date()).toISOString().split(':').slice(0,-1).join(':'),
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
            (props) => {
              return (
                <Form className="flex flex-col justify-center gap-2 scroll-auto">
                  <FormikControl control='input' name='discountName' label='Discount Name :' placeholder="Enter your discount name here, ex: Weekend Deals, Buy 1 Get 1" className='w-full bg-slate-200 px-2 py-1'/>
                  <FormikControl control='textarea' name='discountDescription' label='Discount Description :' placeholder='Enter your discount details here' className='w-full bg-slate-200 px-2 py-1'/>
                  <FormikControl control='input' name='discountCode' label='Discount Code :' placeholder="Enter your unique code here, for customer to enter" className='w-full bg-slate-200 px-2 py-1'/>
                  <DiscountCutType onChange={props.handleChange}/>
                  <FormikControl control='number' min={0} name='discountCut' label={`Discount Cut ${props.values.discountCutType === 'NOMINAL'? '(IDR)': '(0~100)%'}`} placeholder='Price in IDR' className='w-full bg-slate-200 px-2 py-1'/>
                  <div className="p-2 w-full border border-slate-400 mt-2">
                    <h2 className="font-bold">Discount Requirements</h2>
                    <p className="text-slate-600 text-sm">Input 0 for no requirements</p>
                    <div className="grid grid-cols-2 gap-4 w-full px-4">
                      <FormikControl control='number' min={0} name='discountReqQuantity' label='Item quantity:' placeholder='requirements total quantity' className='w-full bg-slate-200 px-2 py-1'/>
                      <FormikControl control='number' min={0} name='discountReqPrice' label='Total price (IDR):' placeholder='requirements total price' className='w-full bg-slate-200 px-2 py-1'/>
                    </div>
                  </div>
                  <FormikControl control='dateTime' name='discountDateExpire' label='Discount expire time:' placeholder='expire time' className='w-full bg-slate-200 px-2 py-1'/>
                  <div>
                    <FormikControl control='number' min={0} name='discountLimit' label={`Discount Usage :`} placeholder='Quantity of discount' className='w-full bg-slate-200 px-2 py-1'/>
                    <p className="text-slate-500">set to 0, for unlimit discount usage</p>
                  </div>
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
