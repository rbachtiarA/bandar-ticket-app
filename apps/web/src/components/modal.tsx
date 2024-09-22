import Image from "next/image";

export default function ModalWrapper({children, handleClose, title}: {children: React.ReactNode, handleClose: any, title:string}) {
  return (
    <div className='absolute z-0 top-0 left-0 w-full h-full bg-slate-600/50'>
      <div className='absolute z-0 w-full h-full' onClick={handleClose}></div>
      <div className='flex z-10 w-full h-full md:justify-center md:items-center'>  
        <div className='fixed top-[10%] md:relative md:top-0  max-h-[80vh] overflow-auto w-full md:w-1/2 p-4 rounded-md bg-white [&_label]:font-semibold fade-in-left transform'>
        <h1 className='text-3xl font-bold text-center'>{title}</h1>
          {children}
          <button onClick={handleClose} className='absolute top-2 right-2'>
            <Image 
              src={'/ico-close.svg'}
              alt="close"
              width={32}
              height={32}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
