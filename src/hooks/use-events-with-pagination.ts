import { useEffect, useState, useCallback } from "react";

import { config } from "@/lib/config";
import { usePagination } from "./use-pagination";
import { fetchEvents, mockEvents } from "@/lib/data";

interface UseEventsWithPaginationOptions {
  keyword?: string;
  city?: string;
  stateCode?: string;
  countryCode?: string;
  classificationName?: string;
  startDateTime?: string;
  endDateTime?: string;
  defaultPageSize?: number;
}

interface UseEventsWithPaginationReturn {
  events: TEvent[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  pagination: ReturnType<typeof usePagination>;
}

const useEventsWithPagination = (
  options: UseEventsWithPaginationOptions = {},
): UseEventsWithPaginationReturn => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const pagination = usePagination({
    defaultSize: options.defaultPageSize || 9,
    onPageChange: (page, size) => {
      // Trigger refetch when pagination changes
      loadEvents(page, size);
    },
  });

  const loadEvents = useCallback(
    async (page?: number, size?: number) => {
      setLoading(true);
      setError(null);

      const currentPage = page || pagination.currentPage;
      const currentSize = size || pagination.pageSize;

      try {
        // Check if we have a valid API key
        if (!config.apiKey) {
          console.warn("Ticketmaster API key not configured. Using mock data.");

          // Simulate API delay
          await new Promise((resolve) => setTimeout(resolve, 1000));

          // Simulate pagination with mock data
          const startIndex = (currentPage - 1) * currentSize;
          const endIndex = startIndex + currentSize;
          const paginatedMockEvents = mockEvents.slice(startIndex, endIndex);

          setEvents(paginatedMockEvents);
          pagination.setTotalPages(Math.ceil(mockEvents.length / currentSize));
          pagination.setTotalElements(mockEvents.length);
          return;
        }

        // Build API parameters
        const apiParams = {
          ...options,
          page: currentPage - 1, // Ticketmaster API is 0-based
          size: currentSize,
        };

        const result = await fetchEvents(apiParams);
        console.log("API response:", result);

        setEvents(result.events);
        pagination.setTotalPages(result.totalPages || 1);
        pagination.setTotalElements(
          result.totalElements || result.events.length,
        );
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch events";
        console.error("Failed to fetch events:", err);
        setError(errorMessage);

        // Fallback to mock data on error
        const startIndex = (currentPage - 1) * currentSize;
        const endIndex = startIndex + currentSize;
        const paginatedMockEvents = mockEvents.slice(startIndex, endIndex);

        setEvents(paginatedMockEvents);
        pagination.setTotalPages(Math.ceil(mockEvents.length / currentSize));
        pagination.setTotalElements(mockEvents.length);
      } finally {
        setLoading(false);
      }
    },
    [options, pagination],
  );

  const refetch = useCallback(() => {
    return loadEvents();
  }, [loadEvents]);

  // Initial load
  useEffect(() => {
    loadEvents();
  }, []); // Only run on mount, pagination changes handled by onPageChange

  return {
    events,
    loading,
    error,
    refetch,
    pagination,
  };
};

export default useEventsWithPagination;
