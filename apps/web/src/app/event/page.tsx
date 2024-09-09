import CategoryContainer from "@/components/home/categoryContainer"
import { getEvents } from "@/lib/event"

export default async function page() {
    const data =  await getEvents()

    return (
    <div>
        <CategoryContainer category={data} />
    </div>
  )
}
