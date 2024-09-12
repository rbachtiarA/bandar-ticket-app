import { Form, Formik } from "formik";
import FormikControl from "../formikControl/formikControl";
import * as yup from 'yup';
import { postTicketType } from "@/lib/ticket";
import { toast } from "react-toastify";

const createTicketSchema =  yup.object().shape({
    ticketName: yup.string().required('Ticket should have name'),
    ticketDescription: yup.string(),
    ticketPrice: yup.number().min(0, 'Minimum of price value is 0 / Free'),
    ticketQuota: yup.number().min(1, 'Minimum of ticket quota should be 1')
  })

export default function TicketFormik({eventId, handleClose}: {eventId: number, handleClose: any}) {
  return (
    <Formik
        initialValues={{
          ticketName: '',
          ticketDescription: '',
          ticketPrice: 0,
          ticketQuota: 0,
          eventId: eventId
        }}
        validationSchema={createTicketSchema}
        onSubmit={async (values, action) => {
          try {
            const {result, ok} = await postTicketType(values)
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
                  <FormikControl control='input' name='ticketName' label='Ticket Name :' placeholder="Enter your ticket name here, ex: Free, Regular, Backseat Ticket" className='w-full bg-slate-200 px-2 py-1'/>
                  <FormikControl control='textarea' name='ticketDescription' label='Ticket Description :' placeholder='Enter your requirement for the ticket here' className='w-full bg-slate-200 px-2 py-1'/>
                  <FormikControl control='number' min={0} name='ticketPrice' label='Ticket Price (IDR):' placeholder='Price in IDR' className='w-full bg-slate-200 px-2 py-1'/>
                  <FormikControl control='number' min={0} name='ticketQuota' label='Ticket Quota :' className='w-full bg-slate-200 px-2 py-1'/>
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
