import { ErrorMessage, Field } from 'formik'
import React from 'react'

export default function DiscountCutType({ onChange }: { onChange:any }) {
    const datas = [
        {label: 'Nominal', value: 'NOMINAL'},
        {label: 'Percentage', value: 'PERCENTAGE'},
    ]
  return (
    <div>
        <label htmlFor='discountCutType'>Discount Type :</label>
        <Field as='select' id='discountCutType' name='discountCutType' className='bg-slate-200' onChange={onChange}>
            {datas.map((data) => (
                <option key={data.value} value={data.value}>{data.label}</option>
            ))}
        </Field>
        <ErrorMessage name='discountCutType' component={'div'} className='text-red-600'/>
        <p className='text-sm text-slate-400'>{`Nominal for fixed cut (IDR), Percentage for percent cut (%) of total price`}</p>
    </div>
  )
}
