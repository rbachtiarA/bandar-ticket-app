'use client'
import { IProvince } from '@/type/province'
import EventCard from '@/components/eventCard'
import FilterCategory from '@/components/filterCategory'
import FilterProvince from '@/components/filterProvince'
import Pagination from '@/components/pagination'
import { getEvents } from '@/lib/event'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { IEvent } from '@/type/event'

export default function EventFilter({provinceData}: { provinceData: IProvince[]}) {
    const searchRef = useRef<HTMLInputElement>(null)
    const searchParams = useSearchParams()
    const querySearch = searchParams.get('search')
    const queryCategory = searchParams.get('category')
    const queryLocation = searchParams.get('location')
    const [pages, setPages] = useState(1)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState<string>(querySearch || '')
    const [data, setData] = useState<IEvent[]>([])
    const [province, setProvince] = useState('')
    const [category, setCategory] = useState<string>(queryCategory || '')
    const [location, setLocation] = useState<string>(queryLocation || '')
    const [val] = useDebounce(search, 1000)
    const [cat] = useDebounce(category, 0)
    const [loc] = useDebounce(location, 0)
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

    const handleChangeLocation = (e: any) => {
        setLocation(e.target.value)
    }
    const handleChange = () => {
        if(searchRef.current) {
            setSearch(searchRef.current.value)
        }
    }
    const handleResetFilter = () => {
        setCategory('') 
        setSearch('')
        setLocation('')                
    }

    const getData = async () => {
        try {
            router.push(`?search=${val}&category=${category}&location=${location}`)
            const {name, data} = await getEvents(val, cat, loc)
            setData(data)
            setProvince(provinceData.find((province) => province.id === Number(loc))?.name!)
            setPages(Math.ceil(data.length/8) || 1)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getData()
    }, [val, cat, loc])

    return (
        <section className='flex flex-col md:flex-row'>
            {/* {FILTER FIELD} */}
            <div className='flex flex-col p-4 gap-4 md:w-1/4 bg-slate-50 md:min-h-screen'>
                    <button onClick={handleResetFilter} className='hover:bg-slate-200 px-2 py-1'>Reset Filter</button>
                    <input
                    onChange={handleChange} 
                    ref={searchRef}
                    value={search}
                    type="text" placeholder='search event by name' 
                    className='bg-slate-200 focus:ring-2 rounded-sm py-2 px-4 border-2 border-slate-400'
                    />
                    <div>
                        <h1 className='font-bold'>Category :</h1>
                        <FilterCategory handleChangeRadio={handleChangeRadio} checkCategory={queryCategory!}/>
                    </div>
                    <div>
                        <h1 className='font-bold'>Location :</h1>
                        <FilterProvince provinceData={provinceData} handleChange={handleChangeLocation} provinceId={queryLocation!}/>
                    </div>
                </div>
            <div className='flex flex-col justify-center items-center md:justify-normal md:items-start md:flex-row'>
                
                
                {/* {EVENT RESULT FIELD} */}
                <div className='w-full flex flex-col items-center justify-center p-4'>
                    <h1 className='text-xl font-semibold text-center'>Events</h1>
                    <div className='flex flex-col gap-2 md:gap-0 md:flex-row md:w-[1000px] items-center justify-between'>
                        <div>
                        {
                            (val !== '' || cat !=='') &&
                            <h2 className='font-bold px-2 '>Search result {val !== ''? ` for "${val}"`: ``}{cat !== ''? ` in "${cat}" category` : ``}{loc !== ``? ` at "${province}"` : ``}</h2>
                        }
                        </div>

                        <Pagination pages={pages} handlePageJump={handlePageJump} handlePage={handlePage}/>
                    </div>
                    <div className={`grid md:grid-cols-[repeat(2,_250px)] xl:grid-cols-[repeat(4,_250px)] md:grid-rows-${data.length < 5? `1`: `2`}`}>
                        {
                            data.slice((page*8)-8, 8*page).map((event) => {
                                return (
                                    <EventCard
                                        key={event.slug}
                                        eventId = {event.id}
                                        eventSlug = {event.slug}
                                        eventTitle={event.name}
                                        eventImg={event.img_poster}
                                        eventDate={new Date(event.date_start)}
                                        eventLocation={`${event.city.name}, ${event.city.province.name}`}
                                        userName={event.user?.name || 'Dummy'}
                                    />
                                )
                            })
                        }
                    </div>
                    <div className='mt-4'>
                    <Pagination pages={pages} handlePageJump={handlePageJump} handlePage={handlePage}/> 
                    </div>           
                </div>
                
            </div>
            
            {/* {DEBUG STATE FIELD} */}
            {/* <div className='flex flex-col'>
            <h1>Debug Search & filter</h1>
            <div>State: "{search}", "{category}", "{province}"</div>
            <div>Pages: {pages}</div>
            <div>Page: {page}</div>
            <div>Debounce: {val}, {cat}, {loc}</div>
            
            </div> */}

            
        </section>
  )
}
