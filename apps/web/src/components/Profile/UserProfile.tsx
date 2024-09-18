'use client';
import { useAppSelector } from '@/app/redux/hooks';
import { SideBarOption } from '@/type/user';
import { useState } from 'react';
import Profile from './options/Profile';
import Account from './options/Account';
import Link from 'next/link';

export default function UserProfile() {
  const user = useAppSelector((state) => state.author);
  const [option, setOption] = useState<SideBarOption>('profile');

  const handleClick = (option: SideBarOption) => {
    setOption(option);
  };

  return (
    <div className='flex flex-col w-full p-5 items-center'>
      <h1 className='text-2xl text-black m-5 p-5 '>User Profile</h1>
      <div className="flex flex-col justify-around h-full w-full">
        {/*sidebar*/}
        <div className="flex flex-row justify-around p-5 cursor-pointer border-solid border-black border-4 ">
          <button className='hover:underline hover:text-white hover:bg-black duration-500 p-2 rounded-full' onClick={() => handleClick('profile')}>Profile</button>
          <button className='hover:underline hover:text-white hover:bg-black duration-500 p-2 rounded-full' onClick={() => handleClick('event')}>Event</button>
          <button className='hover:underline hover:text-white hover:bg-black duration-500 p-2 rounded-full' onClick={() => handleClick('ticket')}>Ticket</button>
          <button className='hover:underline hover:text-white hover:bg-black duration-500 p-2 rounded-full' onClick={() => handleClick('transaction')}>
            Transaction
          </button>
          <button className='hover:underline hover:text-white hover:bg-black duration-500 p-2 rounded-full' onClick={() => handleClick('account')}>Account</button>
          {
            user.role === 'ORGANIZER' && (
              <Link href={'/dashboard'} className='hover:underline hover:text-white hover:bg-black duration-500 p-2 rounded-full' >Dashboard</Link>
            )
          }
        </div>
        {/*content*/}
        <div className="p-5 h-full w-full">
          {option === 'profile' && <Profile />}
          {option === 'event' && <div>Event</div>}
          {option === 'ticket' && <div>Ticket</div>}
          {option === 'transaction' && <div>Transaction</div>}
          {option === 'account' && <Account />}
        </div>
      </div>
    </div>
  );
}
