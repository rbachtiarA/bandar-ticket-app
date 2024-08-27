import Image from 'next/image'
import styles from './page.module.css'
import CategoriesNav from '@/components/categoriesNav'
import ConcertHero from '@/components/home/concertHero'
import Carousel from '@/components/carousel'
import { ICategory } from './interfaceType'
import CategoryContainer from '@/components/home/categoryContainer'


export default function Home() {

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

  return (
    <>
    <CategoriesNav />
    {/* <Carousel />     */}
    <CategoryContainer 
    category={categories[0]}
    />
    <CategoryContainer 
    category={categories[1]}
    />
    </>
  )
}
