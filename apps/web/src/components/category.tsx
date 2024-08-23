import Link from 'next/link'
import React from 'react'

export default function Category({ title }: {  title: string }) {
  return (
    <Link href={'/'}>
            <div className='flex flex-col items-center'>
            <div className='w-[80px] h-[80px] rounded-full bg-gray-400'></div>
            <p>{title}</p>
            </div>
    </Link>
  )
}
