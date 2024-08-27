'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Carousel() {

    const [curr, setCurr] = useState(0)
    const images = [
        '/city/1.jpg',
        '/city/2.webp',
        '/city/3.jpg'
    ]

    useEffect(() => {
        const slideInterval = setInterval(next, 7000)
        return () => clearInterval(slideInterval)
    },[curr])

    const prev = () => setCurr((curr) => (curr === 0? images.length - 1 : curr - 1)) 
    const next = () => setCurr((curr) => (curr === images.length - 1? 0 : curr + 1)) 

  return (
  <div className='w-screen mx-auto'>
      <div className='overflow-hidden relative'>          
          <div className='transition-transform'>
                  <Image        
                  src={images[curr]}
                  alt='city'
                  width={0}
                  height={0}
                  sizes='100vw'
                  style={{width: '100%', height: 'auto'}}
                  />
          </div>
          <button onClick={next}>Next</button>
          <button onClick={prev}>Prev</button>
      </div>

  </div>
  )
}
