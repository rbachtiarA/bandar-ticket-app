import React from 'react'
import FormikControl from '../formikControl/formikControl'

export default function FormTime(props: {className: string}) {
  const { className } = props
  return (
    <div className='flex gap-4'>
        <FormikControl control='time' name='eventTimeStart' label='Event start time' className={className}/>
        <FormikControl control='time' name='eventTimeEnd' label='Event End time' className={className}/>      
    </div>
  )
}
