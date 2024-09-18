import React from 'react'
import FormikInput from './formikInput'
import FormikDate from './formikDate'
import FormikTextarea from './formikTextarea'
import FormikTime from './formikTime'
import FormikNumber from './formikNumber'

export default function FormikControl(props: { control: string, label: string, name: string, className: string, min?: number, max?:number, placeholder?: string}) {
    const { control, ...rest } = props
    switch (control) {
        case 'input': return <FormikInput {...rest} /> 
        case 'number': return <FormikNumber {...rest} /> 
        case 'date': return <FormikDate {...rest} /> 
        case 'textarea': return <FormikTextarea {...rest} /> 
        case 'time': return <FormikTime {...rest} /> 
        default: return null
    }
}
