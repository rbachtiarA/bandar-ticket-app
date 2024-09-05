import React from 'react'
import FormikControl from './formikControl'

export default function FormDate(props: {className: string}) {
    const { className } = props
  return (
    <div className='flex gap-4'>
        <FormikControl control='date' name='eventDateStart' label='Event Start Date:' className={className}/>
        <FormikControl control='date' name='eventDateEnd' label='Event End Date:' className={className}/>      
    </div>
  )
}
