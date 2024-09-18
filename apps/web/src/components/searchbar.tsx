'use client'
import { getEvents } from '@/lib/event'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'
import SearchbarCard from './searchbarCard'
import { IEvent } from '@/type/event'

export default function SearchBar() {
    const searchRef = useRef<HTMLInputElement>(null)
    const [dropdown, setDropdown] = useState(false)
    const [data, setData] = useState([])
    const [search, setSearch] = useState<string>('')
    const [val] = useDebounce(search, 1000)

    const getData = async () => {
        try {
            const { name, data } = await getEvents(val)
            setData(data)
        } catch (error) {
            console.log(error);
        }
    }
    
    const handleChange = () => {
        if(searchRef.current) {
            setSearch(searchRef.current.value)
        }
    }

    const handleClickLink = () => {
        setSearch('')
        setData([])
        setDropdown(false)
    }

    useEffect(() => {
       
        if(search.length > 2 ) {
            getData()
        }
    },[val])

  return (
    <div className='md:w-3/4 relative'>
        <input 
            type="search"  
            className={`focus:ring-1 py-2 px-6 outline-none rounded-xl ${dropdown? `rounded-bl-none rounded-br-none`: ``} w-full shadow-sm placeholder:italic`} 
            placeholder='search your event here...'
            onChange={handleChange}
            ref={searchRef}
            value={search}
            onClick={() => setDropdown(!dropdown)}
        />
        <button type='submit' className='absolute top-[8px] right-[12px]'>
            <Image
            src={'/ico-search.svg'}
            alt='search'
            width={24}
            height={24}
            draggable='false' />
        </button>
        {
            dropdown &&
             
            <div className='relative'>
                <div className='absolute w-full flex flex-col ring-1 bg-white pt-4 top-0 z-10 max-h-[300px] overflow-auto'>
                    { data.length === 0 && <p className='text-slate-400 px-2'>No Result found</p>}
                    {data.map((event: IEvent) => (
                        <SearchbarCard key={event.slug} event={event} handleClickLink={handleClickLink}/>
                    ))}
                </div>
            </div>
        }
    </div>
  )
}
