import { useState } from "react";

import { RefreshCw } from "lucide-react";

import {
  EventCard,
  EventDetailsModal,
  EventsPagination,
  LoadingCards,
  LoadingFilters,
  SearchFilters,
} from "@/components/shared/index";
import useEvents from "@/lib/hooks/use-events";
import { Alert, AlertDescription, Button } from "@/components/ui";

const EventsContainer = () => {
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null);

  const {
    events,
    loading,
    error,
    refetch,
    // Filter states and handlers
    searchQuery,
    selectedEventType,
    locationQuery,
    dateRange,
    currentPage,
    pageSize,
    totalPages,
    totalElements,
    goToNextPage,
    goToPage,
    goToPreviousPage,
    setPageSize,
    setSearchQuery,
    setSelectedEventType,
    setLocationQuery,
    setDateRange,
    clearFilters,
  } = useEvents();

  const handleEventClick = (event: TEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search and Filters */}
      {loading && events.length === 0 ? (
        <LoadingFilters />
      ) : (
        <SearchFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          locationQuery={locationQuery}
          onLocationChange={setLocationQuery}
          selectedEventType={selectedEventType}
          onEventTypeChange={setSelectedEventType}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          onClearFilters={clearFilters}
          loading={loading}
        />
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={refetch}
              className="ml-4 bg-transparent"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Events Grid */}
      {loading && events.length === 0 ? (
        <LoadingCards />
      ) : events.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-500">
            No events found matching your criteria.
          </p>
          <p className="mt-2 text-gray-400">
            Try adjusting your search or filters.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onClick={() => handleEventClick(event)}
              />
            ))}
          </div>

          {/* Pagination */}
          <EventsPagination
            pagination={{
              currentPage,
              pageSize,
              totalPages,
              totalElements,
              goToNextPage,
              goToPage,
              goToPreviousPage,
              setPageSize,
            }}
            loading={loading}
          />
        </>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default EventsContainer;
