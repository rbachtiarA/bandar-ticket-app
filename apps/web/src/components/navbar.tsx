import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import SearchBar from './searchbar'

export default function Navbar() {
  return (
    <nav className='bg-cyan-300 p-4 w-full absolute top-0'>
        <div className='flex flex-row items-center'>
            <div className='w-1/5 flex justify-center'>
                <Link href={'/'}>Logo</Link>
            </div>

            <div className='w-4/5'>
                <div className='flex flex-col-reverse gap-4 md:flex-row justify-center items-center md:mb-4 md:justify-between'>
                    <SearchBar />
                    <div className='flex justify-around gap-4 underline-hover'>
                        {/* untuk user */}
                        <Link href={'/'}>Home</Link>
                        <Link href={'/login'}>Login</Link>
                        <Link href={'/register'}>Register</Link>
                    </div>
                </div>

                <div className='hidden md:flex justify-around underline-hover'>
                    <div className='flex justify-between w-3/4 pr-12 border-r-2'>
                        {/* diisi sesuai category yang ada */}
                        <Link href={'/event?category=Music'}>Music Concert</Link>
                        <Link href={'/event?category=Seminar'}>Seminar</Link>
                        <Link href={'/event?category=Gallery'}>Art Gallery</Link>
                        <Link href={'/event?category=Entertainment'}>Entertainment</Link>
                        <Link href={'/event?category=Sport'}>Sport</Link>
                    </div>
                    <div className='flex items-center justify-center w-1/4'>
                        <Link href={'/createEvent'}>Create Event</Link>
                    </div>
                </div>
                
            </div>
        </div>

        
    </nav>
  )
}
