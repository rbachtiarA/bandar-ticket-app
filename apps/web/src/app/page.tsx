import Image from 'next/image'
import styles from './page.module.css'
import CategoriesNav from '@/components/categoriesNav'

export default function Home() {
  return (
    <>
    <CategoriesNav />
    <div>
      <p>Hellow World</p>
    </div>
    
    </>
  )
}
