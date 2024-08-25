import Image from 'next/image'
import React from 'react'

export default function Carousel() {
    const images = [
        '/city/1.jpg',
        '/city/2.webp',
        '/city/3.jpg'
    ]
  return (
  <div className=''>    
        <div className='overflow-hidden'>
            {images.map((img) => (
                <Image
                src={img}
                alt='city'
                width={600}
                height={400}
                sizes='100vw'
                />
      
            ))}
        </div>
  </div>
  )
}
