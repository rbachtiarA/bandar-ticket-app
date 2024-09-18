'use client'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import SearchBar from './searchbar';
import NavLog from './navProfile/navLog';
import Logo from './logo';



export const Navbar = () => {
  const [hamburger, setHamburger] = useState(false)
  return (
    <nav className="bg-cyan-300 lg:px-4 py-4 w-full absolute top-0 h-[112px]">
      <div className="hidden md:flex flex-row items-center">
        <Logo />

        <div className="w-4/5">
          <div className="flex flex-col-reverse gap-4 md:flex-row justify-center items-center md:mb-4 md:justify-between">
            <SearchBar />
            <div className="flex justify-around gap-2 underline-hover items-center">
              {/* untuk user */}
              <Link href={'/'} className="mr-2 pr-4 border-r-2">
                Home
              </Link>
              <NavLog />
            </div>
          </div>

          <div className="hidden md:flex justify-around underline-hover">
            <div className="flex justify-between w-3/4 pr-8 border-r-2">
              {/* diisi sesuai category yang ada */}
              <Link href={'/event?category=Music'}>Music Concert</Link>
              <Link href={'/event?category=Seminar'}>Seminar</Link>
              <Link href={'/event?category=Gallery'}>Art Gallery</Link>
              <Link href={'/event?category=Entertainment'}>Entertainment</Link>
              <Link href={'/event?category=Sport'}>Sport</Link>
            </div>
            <div className="flex items-center justify-around lg:justify-evenly w-[30%] md:text-sm lg:text-md lg:[&_div]:gap-2">
              <div className='flex'>
                <Image src={'/ico-explore.svg'} alt='explore' width={0} height={0} style={{width: '16px', height: '16px'}} draggable={false}/>
                <Link href={`/event`}>Explore</Link>
              </div>

              <div className='flex'>
                <Image src={`/ico-add-event.svg`} alt='add event' width={0} height={0} style={{width: '16px', height: '16px'}} draggable={false}/>
                <Link href={'/createEvent'}>Create Event</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='md:hidden h-[112px] flex flex-col gap-2'>
            <div className='flex justify-between px-4'>
              <Logo />
              <button onClick={() => setHamburger(true)}>
                <Image
                  src={'/ico-hamburger.svg'}
                  alt={'hamburger'}
                  width={24}
                  height={24}
                />
              </button>
            </div>

            <div className='px-4'>
              <SearchBar />
            </div>
      </div>
      {/* hamburger */}
      <div className={`${!hamburger? 'hidden': ''}  fixed top-0 bg-slate-300/50 w-full h-full z-20 backdrop-blur-md [&_div]:w-full px-4 py-4 transition`}>
      
            <div className='w-full flex justify-end'>
              <button onClick={() => setHamburger(false)}>
                <Image src={'/ico-close.svg'} alt='close' width={24} height={24}/>
              </button>
            </div>

            <div onClick={() => setHamburger(false)} className='py-4'>
              <NavLog />
            </div>

            <div className='flex' onClick={() => setHamburger(false)}>
                <Image src={'/ico-explore.svg'} alt='explore' width={16} height={16} draggable={false}/>
                <Link href={`/event`}>Explore</Link>
              </div>

              <div className='flex' onClick={() => setHamburger(false)}>
                <Image src={`/ico-add-event.svg`} alt='add event' width={16} height={16} draggable={false}/>
                <Link href={'/createEvent'}>Create Event</Link>
              </div>

            <h1 className='font-bold'>Categories</h1>
            <div className="flex flex-col divide-y-2 divide-slate-600 border-b-2 border-slate-600" onClick={() => setHamburger(false)}>
              {/* diisi sesuai category yang ada */}
              <Link href={'/event?category=Music'}>Music Concert</Link>
              <Link href={'/event?category=Seminar'}>Seminar</Link>
              <Link href={'/event?category=Gallery'}>Art Gallery</Link>
              <Link href={'/event?category=Entertainment'}>Entertainment</Link>
              <Link href={'/event?category=Sport'}>Sport</Link>
            </div>
      </div>
    </nav>
  );
}
