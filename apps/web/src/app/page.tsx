import CategoriesNav from '@/components/categoriesNav'
import { ICategory } from './interfaceType'
import CategoryContainer from '@/components/home/categoryContainer'
import { getEventCategory, getEvents, getEventUpcoming } from '@/lib/event'
import { useState } from 'react'


export default async function Home() {
  const categories: ICategory[] = [
    { 
      name: 'Music Concert',
      events: [
        {
          title: 'Merah Putih Music 2024',
          img: 'posterMerahPutih',
          date: 'Aug 17, 2024',
          location: 'Stadion GBK, Jakarta'
        },
        {
          title: 'Live Music Summarecon #69',
          img: 'posterSummarecon',
          date: 'Mar 14, 2024',
          location: 'Summarecon Mall Bekasi, Bekasi'
        },
        {
          title: 'Kangen Band - World Tour 2025',
          img: 'posterKangenBand',
          date: 'Feb 30, 2025',
          location: 'Istana Negara, IKN'
        },
        {
          title: 'Kangen Band - World Tour 2026',
          img: 'posterKangenBand',
          date: 'Feb 30, 2026',
          location: 'Istana Negara, IKN'
        },
        {
          title: 'Kangen Band - World Tour 2027',
          img: 'posterKangenBand',
          date: 'Feb 30, 2027',
          location: 'Istana Negara, IKN'
        },
        {
          title: 'Kangen Band - World Tour 2028',
          img: 'posterKangenBand',
          date: 'Feb 30, 2028',
          location: 'Istana Negara, IKN'
        },
        {
          title: 'Kangen Band - World Tour 2029',
          img: 'posterKangenBand',
          date: 'Feb 30, 2029',
          location: 'Istana Negara, IKN'
        },
      ]
     },
    { 
      name: 'Seminar',
      events: [
        {
          title: 'Workshop Web Fullstack Developer',
          img: 'posterWD',
          date: 'Aug 17, 2024',
          location: 'Purwadhika, Jakarta'
        },
        {
          title: 'Live Music Summarecon #69',
          img: 'posterSummarecon',
          date: 'Mar 14, 2024',
          location: 'Summarecon Mall Bekasi, Bekasi'
        },
        {
          title: 'Kangen Band - World Tour 2025',
          img: 'posterKangenBand',
          date: 'Feb 30, 2025',
          location: 'Istana Negara, IKN'
        },
        {
          title: 'Kangen Band - World Tour 2026',
          img: 'posterKangenBand',
          date: 'Feb 30, 2026',
          location: 'Istana Negara, IKN'
        },
        {
          title: 'Kangen Band - World Tour 2027',
          img: 'posterKangenBand',
          date: 'Feb 30, 2027',
          location: 'Istana Negara, IKN'
        },
        {
          title: 'Kangen Band - World Tour 2028',
          img: 'posterKangenBand',
          date: 'Feb 30, 2028',
          location: 'Istana Negara, IKN'
        },
        {
          title: 'Kangen Band - World Tour 2029',
          img: 'posterKangenBand',
          date: 'Feb 30, 2029',
          location: 'Istana Negara, IKN'
        },
      ]
     },
  ]

  const allEvent = await getEvents();
  const music = await getEventCategory('Music') 
  const seminar = await getEventCategory('Seminar')
  const upcoming = await getEventUpcoming(); 
  
  return (
    <>
      <CategoriesNav />
      {/* <Carousel />     */}
      <CategoryContainer category={upcoming} />
      <CategoryContainer category={allEvent} />
      <CategoryContainer category={music} />
      <CategoryContainer category={seminar} />
    </>
  )
}
