import { getToken } from '@/lib/server';
import { IDashboardEvent } from '@/type/dashboard';
import { getEventList } from '@/lib/dashboard';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import ReviewModals from './modals/review';


export default function DashboardEvent() {
  const [events, setEvents] = useState<IDashboardEvent[]>([]);
  const [token, setToken] = useState<string>('');
  const [ReviewModal, setReviewModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<IDashboardEvent | null>(
    null,
  );

  const cookie = async () => {
    const res = await getToken();
    const token = res || '';
    setToken(token);
    eventList(token);
  };

  const eventList = async (token: string) => {
    const res = await getEventList(token);
    const user = res.result.data[0];
    setEvents(user.Event);
  };

  useEffect(() => {
    cookie();
  }, []);

  return (
    <div>
      {events.length > 0 ? (
        events.map((event) => (
          <div
            key={event.id}
            className="w-full p-10 mb-4 border-double border-black border-4 bg-base-200"
          >
            {/* name alone as a link */}
            <div className="mb-4">
              <Link
                href={`/event/${event.slug}`}
                className="cursor-pointer text-lg text-blue-700"
              >
                {event.name}
              </Link>
            </div>

            {/* 2 cols, left poster, right details */}
            <div className="flex flex-row justify-between w-full">
              <div>
                <img
                  src={event.img_poster}
                  alt={`${event.name} Poster`}
                  width={200}
                  height={500}
                />
              </div>
              <div>
                <div>{event.description || 'No description available'}</div>
              </div>
              <div>
                <div>
                  Start Date: {new Date(event.date_start).toLocaleDateString()}
                </div>
                <div>
                  End Date: {new Date(event.date_end).toLocaleDateString()}
                </div>
                <div>Start Time: {event.time_start}</div>
                <div>End Time: {event.time_end}</div>
                <div>Quota: {event.max_quota}</div>
              </div>
            </div>

            <button
              className="btn btn-primary mt-5 w-full items-center"
              onClick={() => {
                setSelectedEvent(event);
                setReviewModal(true);
              }}
            >
              View Reviews
            </button>

            {ReviewModal && selectedEvent && (
              <ReviewModals selectedEvent={selectedEvent} setModal={setReviewModal} />
            )}
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
