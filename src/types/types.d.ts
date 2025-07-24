// Ticketmaster API types based on their Discovery API
interface TicketmasterEvent {
  id: string;
  name: string;
  info?: string;
  url: string;
  locale: string;
  images: Array<{
    url: string;
    width: number;
    height: number;
    fallback: boolean;
  }>;
  dates: {
    start: {
      localDate: string;
      localTime?: string;
      dateTime?: string;
    };
    timezone?: string;
    status: {
      code: string;
    };
  };
  classifications: Array<{
    primary: boolean;
    segment: {
      id: string;
      name: string;
    };
    genre: {
      id: string;
      name: string;
    };
    subGenre?: {
      id: string;
      name: string;
    };
  }>;
  _embedded?: {
    venues: Array<{
      name: string;
      city: {
        name: string;
      };
      state?: {
        name: string;
        stateCode: string;
      };
      country: {
        name: string;
        countryCode: string;
      };
      address?: {
        line1: string;
      };
    }>;
    attractions?: Array<{
      name: string;
      id: string;
    }>;
  };
  priceRanges?: Array<{
    type: string;
    currency: string;
    min: number;
    max: number;
  }>;
  promoter?: {
    id: string;
    name: string;
  };
  pleaseNote?: string;
  ticketLimit?: {
    info: string;
  };
}

interface TicketmasterResponse {
  _embedded?: {
    events: TicketmasterEvent[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

// Our normalized Event interface
interface TEvent {
  id: string;
  title: string;
  description: string;
  location: string;
  venue: string;
  dateTime: string;
  eventType: string;
  organizer: string;
  attendeeLimit?: number;
  price?: string;
  imageUrl?: string;
  ticketUrl?: string;
  pleaseNote?: string;
}
