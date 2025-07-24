import { useEffect, useState } from "react";

import { fetchEvents, mockEvents } from "@/lib/data";

const useEvents = () => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate API call
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        // Check if we have a valid API key

        const result = await fetchEvents({});
        console.log("API response:", result);
        setEvents(result.events);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        // Fallback to mock data on error
        setEvents(mockEvents);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return {
    events,
    loading,
  };
};
export default useEvents;
