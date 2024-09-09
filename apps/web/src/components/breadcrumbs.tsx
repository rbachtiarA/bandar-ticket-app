'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

export default function BreadCrumbs({ title }: {title:string}) {
    const pathName = usePathname()
    const arrPathName = pathName.split('/')
    
  return (
    <div className='flex gap-2 text-sm md:text-md lg:text-lg'>
        {pathName.split('/').slice(0, pathName.split('/').length - 1).map((_, idx) => (
            // <p key={idx}>{`localhost:3000${pathName.split('/').slice(0, idx+1).join('/')}`}</p>
            <div key={idx} className='flex gap-2'>
                <Link className='text-cyan-600 font-semibold hover:text-cyan-500' href={`http://localhost:3000${pathName.split('/').slice(0, idx+1).join('/')}`} >
                    <p>{idx === 0 ? 'Home ' : `${pathName.split('/')[idx].slice(0,1).toUpperCase()+pathName.split('/')[idx].slice(1)} `}</p>
                </Link>
                <span> &gt; </span>
            </div>
        ))}
        <p className='font-semibold'>{title}</p>
    </div>
  )
}
