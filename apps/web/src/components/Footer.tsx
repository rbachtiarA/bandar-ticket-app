import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='flex flex-col gap-6 md:gap-0 md:flex-row bg-slate-600 text-white md:justify-evenly p-4'>
      <div className='underline-hover font-semibold'>
        <Link href={'/'}>Home</Link>
      </div>

      <div className='underline-hover font-semibold'>
        <Link href={'/'}>About us</Link>
      </div>

      <div>
        <p className='font-semibold'>Category</p>
        <div className='text-sm flex gap-2 flex-col underline-hover'>
          <Link href={'/event?category=Music'}>Music Concert</Link>
          <Link href={'/event?category=Seminar'}>Seminar</Link>
          <Link href={'/event?category=Gallery'}>Art Gallery</Link>
          <Link href={'/event?category=Entertainment'}>Entertainment</Link>
          <Link href={'/event?category=Sport'}>Sport</Link>
        </div>
      </div>

      <div>
        <p className='font-semibold'>Explore Our Event</p>
        <div className='text-sm flex gap-2 flex-col underline-hover'>
          <Link href={'/event'}>Explore</Link>
        </div>
      </div>

      <div>
        <p>Do you have exciting event to share?</p>
        <button className='btn-secondary-ry'>
          <Link href={'/register'}>
            Become Organizer
          </Link>
        </button>
      </div>
      <div></div>
    </div>
  )
}
