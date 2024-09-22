import BreadCrumbs from '@/components/breadcrumbs';
import EventDetails from '@/components/event/eventDetails';
import { verifyRole } from '@/lib/backend';
import { getEventSlug } from '@/lib/event'
import { getToken } from '@/lib/server';
import Image from 'next/image';
import type { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  // fetch data
  const data = await getEventSlug(slug)
 
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: data.event.name,
    openGraph: {
      images: ['/some-specific-page-image.jpg', ...previousImages],
    },
  }
}

export default async function page({ params }: { params: { slug: string } }) {
  const { name, event, ticket, discount, review } = await getEventSlug(params.slug);
  
  const token = await getToken()
  let isAdmin = false
  let id, role
  if(token) {
    const verifiedUser = await verifyRole(token)
    
    if(verifiedUser.status !== 'error') {
      if(event.user) isAdmin = (event.user.id === verifiedUser.userId) 
      id = verifiedUser.userId
      role = verifiedUser.userRole
    }
  } 

  if(event === null) {
    return (
      <section className='flex w-full justify-center items-center'>
        <div className='font-bold text-red-500'>
          <h1>Event not Found</h1>
        </div>
      </section>
    )
  }

  return (
    <section className=''>
      <div className='p-1 md:p-4'>
        <div className='lg:flex gap-4 h-full lg:h-auto '>

          <div className='w-full md:w-[400px]'>
            <div className='breadcrumbs'>
              <BreadCrumbs title={event.name} />
            </div>

            <Image
              src={event.img_poster}
              alt={`poster ${event.name}`}
              width={0}
              height={0}
              sizes='100vw'
              style={{width: '100%', height: 'auto', objectFit: 'cover', objectPosition:''}}
              className='max-h-[400px]  md:max-h-none'
            />
          </div>
          
          <EventDetails event={event} ticket={ticket} discount={discount} isAdmin={isAdmin} user={{id, role}} reviews={review}/>
        </div>       
      </div>
    </section>
  )
}
