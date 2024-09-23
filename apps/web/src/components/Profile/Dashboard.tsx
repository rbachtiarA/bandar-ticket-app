'use client';

import { OrganizerOption } from '@/type/user';
import { useState } from 'react';
import DashboardEvent from './organizerOptions/Events';
import AttendeesList from './organizerOptions/Attendees';

export default function UserProfile() {
  const [option, setOption] = useState<OrganizerOption>('event');

  const handleClick = (option: OrganizerOption) => {
    setOption(option);
  };

  return (
    <div className="flex flex-col w-full p-5 items-center">
      <h1 className="text-2xl text-black m-5 p-5 ">Organizer Dashboard</h1>
      <div className="flex flex-col justify-around h-full w-full">
        {/*sidebar*/}
        <div className="flex flex-row justify-around p-5 cursor-pointer border-solid border-black border-4 ">
          <button
            className="hover:underline hover:text-white hover:bg-black duration-500 p-2 rounded-full"
            onClick={() => handleClick('event')}
          >
            Event
          </button>
          <button
            className="hover:underline hover:text-white hover:bg-black duration-500 p-2 rounded-full"
            onClick={() => handleClick('attendees')}
          >
            Registered Attendees
          </button>
          <button
            className="hover:underline hover:text-white hover:bg-black duration-500 p-2 rounded-full"
            onClick={() => handleClick('statistic')}
          >
            Statistics
          </button>
        </div>
        {/*content*/}
        <div className="p-5 h-full w-full">
          {option === 'event' && <DashboardEvent />}
          {option === 'attendees' && <AttendeesList />}
          {option === 'statistic' && <div>Statistic</div>}
        </div>
      </div>
    </div>
  );
}
