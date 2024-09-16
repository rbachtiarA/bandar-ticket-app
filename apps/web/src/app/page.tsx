import CategoriesNav from '@/components/categoriesNav'
import CategoryContainer from '@/components/home/categoryContainer'
import { getEventCategory, getEvents, getEventUpcoming } from '@/lib/event'
import { ICategory } from '@/type/event';


export default async function Home() {
  
  // const allEvent = await getEvents();
  const music = await getEventCategory('Music') 
  const seminar = await getEventCategory('Seminar')
  const upcoming = await getEventUpcoming(); 
  
  return (
    <>
      <CategoriesNav />
      {/* <Carousel />     */}
      <CategoryContainer category={upcoming} />
      {/* <CategoryContainer category={allEvent} /> */}
      <CategoryContainer category={music} />
      <CategoryContainer category={seminar} />
    </>
  )
}
