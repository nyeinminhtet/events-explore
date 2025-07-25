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

interface UseEvents {
  events: TEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  // Filter states
  searchQuery: string;
  selectedEventType: string;
  dateRange: { from: Date | null; to: Date | null };
  // Filter handlers
  setSearchQuery: (query: string) => void;
  setSelectedEventType: (type: string) => void;
  setDateRange: (range: { from: Date | null; to: Date | null }) => void;
  clearFilters: () => void;
  // Pagination
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

interface UseEventsReturn {
  // Events data
  events: TEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;

  // Filter states
  searchQuery: string;
  locationQuery: string;
  selectedEventType: string;
  dateRange: { from: Date | null; to: Date | null };

  // Filter handlers
  setSearchQuery: (query: string) => void;
  setLocationQuery: (query: string) => void;
  setSelectedEventType: (type: string) => void;
  setDateRange: (range: { from: Date | null; to: Date | null }) => void;
  clearFilters: () => void;

  // Pagination - Enhanced with navigation methods
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  locationQuery: string;
  onLocationChange: (query: string) => void;
  selectedEventType: string;
  onEventTypeChange: (type: string) => void;
  dateRange: { from: Date | null; to: Date | null };
  onDateRangeChange: (range: { from: Date | null; to: Date | null }) => void;
  onClearFilters: () => void;
  loading?: boolean;
}

interface EventsPaginationProps {
  loading?: boolean;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    goToNextPage: () => void;
    goToPage: (page: number) => void;
    goToPreviousPage: () => void;
    setPageSize: (size: number) => void;
  };
}
