import Image from 'next/image'
import React, { useState } from 'react'
import RatingIcon from './ratingIcon'
import { ErrorMessage, Field } from 'formik'
import RatingStarRows from './ratingStarRows'

export default function RatingStarForm({ onClick }: { onClick:any }) {
    const [rating, setRating] = useState(0)
    const [value, setValue] = useState(0)
    const mouseOverRating = (val:number) => {
        setValue(val)
    }
    const mouseLeaveRating = () => {
        setValue(0)
    }
    const onClickRating = () => {
        setRating(value)
        onClick(value)
    }
    return (
        <div>
            <div className='flex gap-4 p-2'>
                <Field name='rating' id='rating' type='number'>
                    {
                        () => ( 
                                // Array.apply(null, Array(5)).map((_, idx) => {
                                //     return (
                                //         <RatingIcon key={idx} isHover={value > idx} onMouseEnter={mouseOverRating} onMouseLeave={mouseLeaveRating} onClick={onClickRating} val={idx} rating={rating}/>
                                //     )
                                // })
                                <RatingStarRows onMouseEnter={mouseOverRating} onMouseLeave={mouseLeaveRating} onClick={onClickRating} value={value} rating={rating} />
                        )
                    }
                </Field>
                <ErrorMessage name='rating' component={'div'} className='text-red-600'/>
                {/* <p>debug : rating: {rating}, value: {value}</p> */}
            </div>
        </div>
    )
}
