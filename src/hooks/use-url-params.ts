import { useCallback, useEffect, useState } from "react";

interface UrlParams {
  page?: number;
  size?: number;
  search?: string;
  eventType?: string;
  dateFrom?: string;
  dateTo?: string;
  location?: string;
}

interface UseUrlParamsReturn {
  params: UrlParams;
  updateParam: (key: keyof UrlParams, value: string | number | null) => void;
  updateParams: (newParams: Partial<UrlParams>) => void;
  clearParams: (keysToKeep?: (keyof UrlParams)[]) => void;
}

export function useUrlParams(): UseUrlParamsReturn {
  const [params, setParams] = useState<UrlParams>({});

  // Read initial params from URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const initialParams: UrlParams = {};

      const page = urlParams.get("page");
      const size = urlParams.get("size");
      const search = urlParams.get("search");
      const eventType = urlParams.get("eventType");
      const dateFrom = urlParams.get("dateFrom");
      const dateTo = urlParams.get("dateTo");

      if (page) initialParams.page = Number.parseInt(page, 10);
      if (size) initialParams.size = Number.parseInt(size, 10);
      if (search) initialParams.search = search;
      if (eventType) initialParams.eventType = eventType;
      if (dateFrom) initialParams.dateFrom = dateFrom;
      if (dateTo) initialParams.dateTo = dateTo;

      setParams(initialParams);
    }
  }, []);

  // Update URL when params change
  const updateURL = useCallback((newParams: UrlParams) => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams();

      // Add all non-null/undefined params to URL
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== "") {
          urlParams.set(key, value.toString());
        }
      });

      const newUrl = `${window.location.pathname}${urlParams.toString() ? `?${urlParams.toString()}` : ""}`;
      window.history.pushState({}, "", newUrl);
    }
  }, []);

  // Update single parameter
  const updateParam = useCallback(
    (key: keyof UrlParams, value: string | number | null) => {
      const newParams = { ...params };

      if (value === null || value === undefined || value === "") {
        delete newParams[key];
      } else {
        newParams[key] = value as any;
      }

      // Reset to page 1 when filters change (except when updating page/size)
      if (key !== "page" && key !== "size") {
        newParams.page = 1;
      }

      setParams(newParams);
      updateURL(newParams);
    },
    [params, updateURL],
  );

  // Update multiple parameters
  const updateParams = useCallback(
    (newParams: Partial<UrlParams>) => {
      const updatedParams = { ...params, ...newParams };

      // Remove null/undefined values
      Object.keys(updatedParams).forEach((key) => {
        const value = updatedParams[key as keyof UrlParams];
        if (value === null || value === undefined || value === "") {
          delete updatedParams[key as keyof UrlParams];
        }
      });

      setParams(updatedParams);
      updateURL(updatedParams);
    },
    [params, updateURL],
  );

  // Clear parameters (optionally keep some)
  const clearParams = useCallback(
    (keysToKeep: (keyof UrlParams)[] = []) => {
      const clearedParams: UrlParams = {};

      keysToKeep.forEach((key) => {
        if (params[key] !== undefined) {
          clearedParams[key] = params[key];
        }
      });

      setParams(clearedParams);
      updateURL(clearedParams);
    },
    [params, updateURL],
  );

  // Listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const newParams: UrlParams = {};

        const page = urlParams.get("page");
        const size = urlParams.get("size");
        const search = urlParams.get("search");
        const eventType = urlParams.get("eventType");
        const dateFrom = urlParams.get("dateFrom");
        const dateTo = urlParams.get("dateTo");

        if (page) newParams.page = Number.parseInt(page, 10);
        if (size) newParams.size = Number.parseInt(size, 10);
        if (search) newParams.search = search;
        if (eventType) newParams.eventType = eventType;
        if (dateFrom) newParams.dateFrom = dateFrom;
        if (dateTo) newParams.dateTo = dateTo;

        setParams(newParams);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return {
    params,
    updateParam,
    updateParams,
    clearParams,
  };
}
