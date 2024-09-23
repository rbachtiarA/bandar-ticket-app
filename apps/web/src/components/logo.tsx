import { Chakra_Petch } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const chakra = Chakra_Petch({
    subsets: ['latin'],
    weight: ['600']
  })
export default function Logo() {
  return (
    <div className="md:w-1/6 xl:w-1/5 md:flex justify-center">
          
          <Link href={'/'} className='flex justify-center items-center gap-2'>
            <div className='relative'>
              <Image
                src={'/ico-logo.svg'}
                alt='Bandar Tiket'
                width={40}
                height={40}
              />

            </div>
            <div className={`md:text-lg font-semibold leading-none ${chakra.className}`}>
              <p>Bandar <br /> Ticket</p>
            </div>
          </Link>
        </div>
  )
}
