import { ErrorMessage, Field } from 'formik'
import React from 'react'

export default function FormikDate(props: { name: string, label: string}) {
  const {name, label, ...rest} = props
  return (
    <div>
        <label htmlFor={name}>{label}</label>
        <div>        
            <Field name={name} {...rest} type='date' id={name}/>
            <ErrorMessage name={name} component={"div"} className='text-sm text-red-600' />
        </div>
    </div>
  )
}
