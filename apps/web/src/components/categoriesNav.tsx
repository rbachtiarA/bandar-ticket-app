import React from 'react'
import Category from './category'

export default function CategoriesNav() {
  return (
    <div className='my-4 grid grid-cols-3 gap-2 md:hidden'>

        <Category title='Music Concert'/>
        <Category title='Seminar'/>
        <Category title='Art Gallery'/>
        <Category title='Entertainment'/>
        <Category title='Sport'/>
        <Category title='See All'/>
    </div>
  )
}
