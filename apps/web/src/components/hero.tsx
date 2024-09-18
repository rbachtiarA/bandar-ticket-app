import { Oswald } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const oswald = Oswald({
    subsets: ['latin'],
    weight: ['700']
  })

export default function Hero() {
  return (
    <div className='relative w-full h-[calc(100vh-112px)]'>
        <Image src={`/landing-page.jpg`} alt='homepage' fill style={{objectFit: 'cover'}} priority/>
        <div className='absolute top-0 h-full w-full bg-cyan-200/30'></div>
        <div className='absolute top-0 w-full h-full flex justify-center items-center'>
          <div className='md:w-2/3 lg:w-1/2 p-8 rounded-xl flex flex-col xl:flex-row gap-4 justify-center items-center bg-slate-400/70 backdrop-blur-sm'>
            <h1 className={`text-white ${oswald.className} text-2xl md:text-3xl lg:text-6xl w-full xl:w-1/2 break-normal`}>EASY! <span>EXPRESS! </span>ENJOY!</h1>
            <div className='flex flex-col gap-4 md:text-xl'>
              <h2>Bandar Ticket is e-commerce for user to buy/sell ticket, you can <span className='text-white font-bold'>explore vastly range of events </span> from all over indonesia,<span className='text-white font-bold'> become our member</span> to gain access full experience of our website or you can <span className='text-white font-bold'> become Organizer</span> to share your amazing event for people to Engage and Enjoy!</h2>
              <div className='flex gap-2'>
                <Link href={'/register'}>
                  <button className='btn-primary-ry h-full'>Become our member</button>
                </Link>
                <Link href={'/event'}>
                  <button className='btn-secondary-ry h-full'>Explore</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
