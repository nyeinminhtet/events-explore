import React, { useState } from "react";

import EventCard from "./event-card";
import useEvents from "@/hooks/use-events";
import EventDetailsModal from "./event-details";

const EventsContainer: React.FC = () => {
  const { events, loading } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null);

  const handleEventClick = (event: TEvent) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Results Summary */}

        {/* Events Grid */}
        {!loading && events.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">
              No events found matching your search.
            </p>
            <p className="mt-2 text-gray-400">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => handleEventClick(event)}
                />
              ))}
            </div>

            {/* Pagination */}
          </>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default EventsContainer;
