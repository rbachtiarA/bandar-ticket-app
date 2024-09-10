'use client'
import EventCard from '@/components/eventCard'
import Pagination from '@/components/pagination'
import { getEvents } from '@/lib/event'
// import { CardBlog } from '@/components/card'
// import Wrapper from '@/components/wrapper'
// import { getBlogs } from '@/lib/blog'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'

export default function Page() {
  const searchRef = useRef<HTMLInputElement>(null)
  const searchParams = useSearchParams()
  const querySearch = searchParams.get('search')
  const queryCategory = searchParams.get('category')
  const [pages, setPages] = useState(1)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState<string>(querySearch || '')
  const [data, setData] = useState([])
  const [category, setCategory] = useState<string>(queryCategory || '')
  const [val] = useDebounce(search, 1000)
  const [cat] = useDebounce(category, 1000)
  const router = useRouter()

  const handlePage = (val: number) => {

      const tempPage = page+val

      if(tempPage < 1) {
        setPage(1)
      } else if(tempPage > pages) {
        setPage(pages)
      } else {
        setPage(tempPage)
      }
    }
  
  const handlePageJump = (val: number) => {
    const tempPage = val

    if(tempPage < 1) {
      setPage(1)
    } else if(tempPage > pages) {
      setPage(pages)
    } else {
      setPage(tempPage)
    }
  }
  const handleChangeRadio = (e: any) => {
    setCategory(e.target.value)
  }
  const handleChange = () => {
    if(searchRef.current) {
      setSearch(searchRef.current.value)
    }
  }

  const getData = async () => {
    try {
      router.push(`?search=${val}&category=${category}`)
      const {name, data} = await getEvents(val, cat)
      setData(data)
      setPages(Math.ceil(data.length/8))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData()
  }, [val, cat])
  return (
    <section>
        
        <div className='flex flex-col justify-center items-center md:justify-normal md:items-start md:flex-row'>
            <div className='flex flex-col p-4 md:w-1/4'>
                <input
                onChange={handleChange} 
                ref={searchRef}
                value={search}
                type="text" placeholder='search event by name' 
                className='bg-slate-200 focus:ring-2 rounded-sm py-2 px-4 border-2 border-slate-400'
                />
                <div>
                    <div className='grid grid-cols-3 w-full text-sm md:text-md'>
                        <div>
                            <input type="radio" name="filterCategory" id='filterDefault' value={''} onChange={(e) => handleChangeRadio(e)}/>
                            <label htmlFor='filterDefault'>Any</label>
                        </div>
                        <div>
                            <input type="radio" name="filterCategory" id='filterMusic' value={'Music'} onChange={(e) => handleChangeRadio(e)}/>
                            <label htmlFor='filterMusic'>Music</label>
                        </div>
                        <div>
                            <input type="radio" name="filterCategory" id='filterSport' value={'Sport'} onChange={(e) => handleChangeRadio(e)}/>
                            <label htmlFor='filterSport'>Sport</label>
                        </div>
                        <div>
                            <input type="radio" name="filterCategory" id='filterEntertainment' value={'Entertainment'} onChange={(e) => handleChangeRadio(e)}/>
                            <label htmlFor='filterEntertainment'>Entertainment</label>
                        </div>
                        <div>
                            <input type="radio" name="filterCategory" id='filterSeminar' value={'Seminar'} onChange={(e) => handleChangeRadio(e)}/>
                            <label htmlFor='filterSeminar'>Seminar</label>
                        </div>
                        <div>
                            <input type="radio" name="filterCategory" id='filterGallery' value={'Gallery'} onChange={(e) => handleChangeRadio(e)}/>
                            <label htmlFor='filterGallery'>Gallery</label>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='w-full p-4'>
                <h1 className='text-xl font-semibold text-center'>Events</h1>
                {
                  (val !== '' || cat !=='') && 
                  <h2 className='font-bold px-2 '>Search result {val !== ''? ` for "${val}"`: ``}{cat !== ''? ` in "${cat}" category` : ``}</h2>
                }

                <div>
                    <Pagination pages={pages} handlePageJump={handlePageJump} handlePage={handlePage}/>
                </div>
                
                <div className="grid justify-center items-center md:grid-cols-[repeat(2,_250px)] xl:grid-cols-[repeat(4,_250px)] md:grid-rows-[repeat(2,_424px)]">
                    {
                    data.slice((page*8)-8, 8*page).map((event: any) => {
                        return (
                            <EventCard
                                key={event.id}
                                eventId = {event.id}
                                eventSlug = {event.slug}
                                eventTitle={event.name}
                                eventImg={event.img_poster}
                                eventDate={new Date(event.date_start)}
                                eventLocation={`${event.location}, ${event.city.province.name}`}
                            />
                        )
                    })
                    }
                </div>

                
            </div>
        </div>
        

        <div className='flex flex-col'>
          <h1>Debug Search & filter</h1>
          <div>State: {search}, {category}</div>
          <div>Pages: {pages}</div>
          <div>Page: {page}</div>
          <div>Debounce: {val}, {cat}</div>
          
        </div>

        
    </section>
  )
}
// 'use client'
// import EventCard from "@/components/eventCard"
// import { getEvents } from "@/lib/event"
// import { IEvent } from "../interfaceType"
// import { useState } from "react"

// export default async function page() {
//     const events =  await getEvents()
//     const pages = Math.ceil(events.data.length/8)
//     const [page, setPage] = useState(1)
//     console.log(pages);
    
//     return (
//     <div className="flex">
//         <div className="w-1/4">
//             <h1>Filter</h1>
//         </div>
//         <div className="grid " style={{gridTemplateColumns: `repeat(4, 250px)`}}>
//             {events.data.slice(0,8).map((event: IEvent) => (
//                 <EventCard
//                 key={event.id}
//                 eventId = {event.id}
//                 eventSlug = {event.slug}
//                 eventTitle={event.name}
//                 eventImg={event.img_poster}
//                 eventDate={new Date(event.date_start)}
//                 eventLocation={`${event.location}, ${event.city.province.name}`}
//                 />
//             ))}
//         </div>
//     </div>
//   )
// }
