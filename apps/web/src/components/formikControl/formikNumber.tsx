import { ErrorMessage, Field } from 'formik'

export default function FormikNumber(props: { name: string, label: string}) {
  const {name, label, ...rest} = props
  return (
    <div className='mt-4'>
        <label htmlFor={name}>{label}</label>
        <div>        
            <Field name={name} {...rest} type='number' id={name}/>
            <ErrorMessage name={name} component={"div"} className='text-sm text-red-600' />
        </div>
    </div>
  )
}
