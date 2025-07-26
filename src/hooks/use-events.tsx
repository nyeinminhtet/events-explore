/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useCallback } from "react";

import { config } from "@/lib/config";
import { fetchEvents } from "@/lib/data";
import { useUrlParams } from "./use-url-params";

const useEvents = (): UseEventsReturn => {
  const { params, updateParam, clearParams } = useUrlParams();

  const [events, setEvents] = useState<TEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Extract values from URL params with defaults
  const searchQuery = params.search || "";
  const selectedEventType = params.eventType || "";
  const currentPage = params.page || 1;
  const pageSize = params.size || 9;
  const locationQuery = params.location || "";

  // Parse date range from URL params
  const dateRangeFrom = params.dateFrom ? new Date(params.dateFrom) : null;
  const dateRangeTo = params.dateTo ? new Date(params.dateTo) : null;
  const dateRange = { from: dateRangeFrom, to: dateRangeTo };

  // Filter handlers that update URL
  const setSearchQuery = useCallback(
    (query: string) => {
      updateParam("search", query || null);
    },
    [updateParam],
  );

  const setLocationQuery = useCallback(
    (query: string) => {
      updateParam("location", query || null);
    },
    [updateParam],
  );

  const setSelectedEventType = useCallback(
    (type: string) => {
      if (type === "all") {
        updateParam("eventType", null);
      } else {
        updateParam("eventType", type || null);
      }
    },
    [updateParam],
  );

  const parseLocation = useCallback((locationStr: string) => {
    if (!locationStr) return { city: undefined, stateCode: undefined };

    // Try to parse "City, State" or "City, ST" format
    const parts = locationStr.split(",").map((part) => part.trim());

    if (parts.length >= 2) {
      const city = parts[0];
      const stateOrCode = parts[1];

      // Check if it's a state code (2 letters) or full state name
      const stateCode =
        stateOrCode.length === 2 ? stateOrCode.toUpperCase() : undefined;

      return { city, stateCode };
    }

    // If no comma, treat as city only
    return { city: locationStr, stateCode: undefined };
  }, []);

  const setDateRange = useCallback(
    ({ from, to }: { from: Date | null; to: Date | null }) => {
      const currentFrom = params.dateFrom;
      const currentTo = params.dateTo;

      const newFrom = from ? from.toLocaleDateString("en-CA") : null;
      const newTo = to ? to.toLocaleDateString("en-CA") : null;

      if (newFrom && newFrom !== currentFrom) {
        updateParam("dateFrom", newFrom);
      }

      if (newTo && newTo !== currentTo) {
        updateParam("dateTo", newTo);
      }
    },
    [updateParam, params.dateFrom, params.dateTo],
  );

  const setCurrentPage = useCallback(
    (page: number) => {
      updateParam("page", page);
    },
    [updateParam],
  );

  const setPageSize = useCallback(
    (size: number) => {
      updateParam("size", size);
    },
    [updateParam],
  );

  const goToPage = useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, totalPages || 1));
      setCurrentPage(validPage);
    },
    [setCurrentPage, totalPages],
  );

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages, setCurrentPage]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage, setCurrentPage]);

  // Computed pagination properties
  const hasNextPage = totalPages > 0 && currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  const clearFilters = useCallback(() => {
    clearParams(["page", "size"]); // Keep pagination params
  }, [clearParams]);

  // Load events function
  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Check if we have a valid API key
      if (!config.apiKey) {
        console.warn("Ticketmaster API key not configured.");

        setEvents([]);
        setTotalPages(1);
        setTotalElements(0);
        return;
      }

      const { city, stateCode } = parseLocation(locationQuery);

      // Build API parameters
      const apiParams = {
        keyword: searchQuery || undefined,
        city: city || undefined, // Specific city search
        stateCode: stateCode || undefined, // State code (e.g., "CA", "NY")
        classificationName: selectedEventType || undefined,
        startDateTime: dateRange.from
          ? dateRange.from.toISOString().split("T")[0] + "T00:00:00Z"
          : undefined,
        endDateTime: dateRange.to
          ? dateRange.to.toISOString().split("T")[0] + "T23:59:59Z"
          : undefined,
        page: currentPage - 1, // Ticketmaster API is 0-based
        size: pageSize,
      };

      const result = await fetchEvents(apiParams);

      setEvents(result.events);
      setTotalPages(result.totalPages || 1);
      setTotalElements(result.totalElements || result.events.length);

      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch events";
      setError(errorMessage);

      setEvents([]);
      setTotalPages(1);
      setTotalElements(0);
    } finally {
      setLoading(false);
    }
  }, [
    searchQuery,
    selectedEventType,
    currentPage,
    pageSize,
    params.dateFrom,
    params.dateTo,
    locationQuery,
  ]);

  const refetch = useCallback(() => {
    // Reset pagination when refetching
    setCurrentPage(1);
    setPageSize(9);
    return loadEvents();
  }, [loadEvents]);

  // Load events when dependencies change
  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return {
    events,
    loading,
    error,
    refetch,
    // Filter states
    searchQuery,
    selectedEventType,
    dateRange,
    locationQuery,
    // Filter handlers
    setSearchQuery,
    setSelectedEventType,
    setDateRange,
    clearFilters,
    setLocationQuery,
    // Pagination
    currentPage,
    pageSize,
    totalPages,
    totalElements,
    setCurrentPage,
    setPageSize,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  };
};

export default useEvents;
