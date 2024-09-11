import { ErrorMessage, Field } from 'formik'
import React from 'react'

export default function FormCatergory() {
    const datas = [
        {label: 'Music', value: 'Music'},
        {label: 'Seminar', value: 'Seminar'},
        {label: 'Entertainment', value: 'Entertainment'},
        {label: 'Sport', value: 'Sport'},
        {label: 'Gallery', value: 'Gallery'},
    ]
  return (
    <div>
        <label htmlFor='eventCategory'>Event Category :</label>
        <Field as='select' id='eventCategory' name='eventCategory' className='bg-slate-200'>
            {datas.map((data) => (
                <option key={data.value} value={data.value}>{data.label}</option>
            ))}
        </Field>
        <ErrorMessage name='eventCategory' component={'div'} className='text-red-600'/>
    </div>
  )
}
