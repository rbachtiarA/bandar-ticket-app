import { Form, Formik } from "formik";
import FormikControl from "../formikControl/formikControl";
import * as yup from 'yup';
import { toast } from "react-toastify";
import { postReview } from "@/lib/review";

const createReviewSchema =  yup.object().shape({
    rating: yup.number().min(1, 'Minimum rating is 1').max(5, 'Maximum rating is 5'),
    review: yup.string()
  })

export default function ReviewFormik({user, eventId}: {user: { id:number, role:string }, eventId: number}) {
  return (
    <Formik
        initialValues={{
          rating: 0,
          review: '',
          userId: user.id,
          eventId
        }}
        validationSchema={createReviewSchema}
        onSubmit={async (values, action) => {
          try {
            const {result, ok} = await postReview(values)
            if(!ok) throw result.msg
            toast.success(result.msg)
            action.resetForm()
          } catch (error) {
            toast.error(error as string)
          }
        }}
        >
          {
            () => {
              return (
                <Form className="flex flex-col justify-center">
                    <FormikControl control='textarea' name='review' label='Give us your review :' placeholder='Express your experience here' className='w-full bg-slate-200 px-2 py-1'/>
                    <FormikControl control='number' min={0}  name='rating' label='Score this event :' placeholder='Rating 0/5' className='w-full bg-slate-200 px-2 py-1' max={5}/>
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