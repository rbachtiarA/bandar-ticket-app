export interface IDashboardEvent {
  id: number;
  category: string;
  name: string;
  slug: string;
  description: string;
  img_poster: string;
  date_start: string;
  date_end: string;
  time_start: string;
  time_end: string;
  max_quota: number;
  Review: {
    review: string;
    rating: number;
    customer: {name: string};
  }[];
}

export interface IDashboardAttendee{
  attendeeName: string;
  attendeeEmail: string;
  ticketType: string;
  ticketPrice: number;
  eventName: string;
  createdAt: string;
}
