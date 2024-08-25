import Image from 'next/image'
import styles from './page.module.css'
import CategoriesNav from '@/components/categoriesNav'
import ConcertHero from '@/components/home/concertHero'
import Carousel from '@/components/carousel'


export default function Home() {
  return (
    <>
    <CategoriesNav />
    <Carousel />
    <ConcertHero />    
    </>
  )
}
