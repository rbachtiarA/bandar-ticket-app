import { Form, Formik } from "formik";
import FormikControl from "../formikControl/formikControl";
import * as yup from 'yup';

const createTicketSchema =  yup.object().shape({
    ticketName: yup.string().required('Ticket should have name'),
    ticketDescription: yup.string(),
    ticketPrice: yup.number().min(0, 'Minimum of price value is 0 / Free'),
    ticketQuota: yup.number().min(1, 'Minimum of ticket quota should be 1')
  })

export default function TicketFormik({eventId}: {eventId: number}) {
  return (
    <Formik
        initialValues={{
          ticketName: '',
          ticketDescription: '',
          ticketPrice: 0,
          ticketQuota: 0
        }}
        validationSchema={createTicketSchema}
        onSubmit={(values, action) => {
          console.log(values, `for event ${eventId}`);  
        }}
        >
          {
            () => {
              return (
                <Form>
                  <FormikControl control='input' name='ticketName' label='Ticket Name :' placeholder="Enter your ticket name here, ex: Free, Regular, Backseat Ticket" className='bg-slate-200'/>
                  <FormikControl control='textarea' name='ticketDescription' label='Ticket Description :' placeholder='Enter your requirement for the ticket here' className='bg-slate-200'/>
                  <FormikControl control='number' min={0} name='ticketPrice' label='Ticket Price (IDR):' placeholder='Price in IDR' className='bg-slate-200'/>
                  <FormikControl control='number' min={0} name='ticketQuota' label='Ticket Quota :' className='bg-slate-200'/>
                  <button type="submit">Submit</button>
                </Form>   
              )
            }
          }
        </Formik>
  )
}
