

export const getEventList = async (token: string) => {
  const res = await fetch('http://localhost:8000/api/dashboard', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const result = await res.json();
  return { result, ok: res.ok };
};

export const getAttendees = async (token: string) => {
  const res = await fetch(`http://localhost:8000/api/dashboard/attendees`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const result = await res.json();
  return { result, ok: res.ok };
}