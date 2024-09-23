

import { useEffect, useState } from 'react';
import { getAttendees } from '@/lib/dashboard';
import { getToken } from '@/lib/server';
import { IDashboardAttendee } from '@/type/dashboard';

export default function AttendeesList() {
  const [attendees, setAttendees] = useState<IDashboardAttendee[]>([]);

  const fetchAttendees = async (token: string) => {
    const res = await getAttendees(token);
    if (res.ok && res.result.data) {
      setAttendees(res.result.data);
    } else {
      setAttendees([]);
    }
  };

  useEffect(() => {
    const fetchTokenAndAttendees = async () => {
      const token = await getToken();
      await fetchAttendees(token || '');
    };

    fetchTokenAndAttendees();
  }, []);

  return (
    <div className="p-5">
      <h3 className="font-bold text-lg mb-4">Registered Attendees</h3>
      <div className="overflow-y-auto max-h-[70vh]">
        {attendees.length > 0 ? (
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Event Name</th>
                <th className="border px-4 py-2">Ticket Type</th>
                <th className="border px-4 py-2">Ticket Price(IDR)</th>
                <th className="border px-4 py-2">Date Created</th>
              </tr>
            </thead>
            <tbody>
              {attendees.map((attendee) => (
                <tr key={attendee.attendeeEmail}>
                  <td className="border px-4 py-2">{attendee.attendeeName}</td>
                  <td className="border px-4 py-2">{attendee.attendeeEmail}</td>
                  <td className="border px-4 py-2">{attendee.eventName}</td>
                  <td className="border px-4 py-2">{attendee.ticketType}</td>
                  <td className="border px-4 py-2">{attendee.ticketPrice}</td>
                  <td className="border px-4 py-2">{new Date(attendee.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No attendees found.</div>
        )}
      </div>
    </div>
  );
}
