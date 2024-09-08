import { ErrorMessage, Field } from 'formik'
import React from 'react'

export default function FormikTextarea(props: { name: string, label: string }) {
  const {name, label, ...rest} = props
  return (
    <div className='mt-4'>
        <label htmlFor={name}>{label}</label>
        <div>        
            <Field as='textarea' name={name} {...rest} type='textarea' id={name}/>
            <ErrorMessage name={name} component={"div"} className='text-sm text-red-600' />
        </div>
    </div>
  )
}
