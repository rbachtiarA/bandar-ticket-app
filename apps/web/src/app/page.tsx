import CategoriesNav from '@/components/categoriesNav'
import Hero from '@/components/hero';
import CategoryContainer from '@/components/home/categoryContainer'
import { getEventCategory, getEvents, getEventUpcoming } from '@/lib/event'
import { ICategory } from '@/type/event';
import { Metadata } from 'next';
import { Oswald } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home | Bandar Tiket',
  description: 'Bandar tiket e-commerce for buy ticket or share your event to be acknoledge to our visitor',
};


export default async function Home() {
  
  // const allEvent = await getEvents();
  const music = await getEventCategory('Music') 
  const seminar = await getEventCategory('Seminar')
  const upcoming = await getEventUpcoming(); 
  
  return (
    <>
      <Hero />
      <CategoriesNav />
      
      {/* <Carousel />     */}
      <CategoryContainer category={upcoming} />
      {/* <CategoryContainer category={allEvent} /> */}
      <CategoryContainer category={music} />
      <CategoryContainer category={seminar} />
    </>
  )
}
