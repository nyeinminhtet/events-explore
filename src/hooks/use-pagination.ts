/* eslint-disable react-hooks/exhaustive-deps */

import { useCallback, useEffect, useState } from "react";

import { useSearchParams, useNavigate } from "react-router-dom";

interface UsePaginationOptions {
  defaultPage?: number;
  defaultSize?: number;
  onPageChange?: (page: number, size: number) => void;
}

interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  setCurrentPage: (page: number) => void;
  setPageSize: (size: number) => void;
  setTotalPages: (total: number) => void;
  setTotalElements: (total: number) => void;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function usePagination({
  defaultPage = 1,
  defaultSize = 9,
  onPageChange,
}: UsePaginationOptions = {}): UsePaginationReturn {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get initial values from URL or use defaults
  const [currentPage, setCurrentPageState] = useState(() => {
    const pageParam = searchParams.get("page");
    return pageParam ? Number.parseInt(pageParam, 10) : defaultPage;
  });

  const [pageSize, setPageSizeState] = useState(() => {
    const sizeParam = searchParams.get("size");
    return sizeParam ? Number.parseInt(sizeParam, 10) : defaultSize;
  });

  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Update URL when pagination changes
  const updateURL = useCallback(
    (page: number, size: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", page.toString());
      params.set("size", size.toString());

      setSearchParams(params);
      navigate(`?${params.toString()}`);
    },
    [searchParams],
  );

  // Set current page and update URL
  const setCurrentPage = useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, totalPages || 1));
      setCurrentPageState(validPage);
      updateURL(validPage, pageSize);
      onPageChange?.(validPage, pageSize);
    },
    [pageSize, totalPages, updateURL, onPageChange],
  );

  // Set page size and reset to page 1
  const setPageSize = useCallback(
    (size: number) => {
      setPageSizeState(size);
      setCurrentPageState(1);
      updateURL(1, size);
      onPageChange?.(1, size);
    },
    [updateURL, onPageChange],
  );

  // Navigation functions
  const goToPage = useCallback(
    (page: number) => setCurrentPage(page),
    [setCurrentPage],
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

  // Computed properties
  const hasNextPage = currentPage < totalPages;
  const hasPreviousPage = currentPage > 1;

  // Sync with URL changes (browser back/forward)
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const sizeParam = searchParams.get("size");

    const urlPage = pageParam ? Number.parseInt(pageParam, 10) : defaultPage;
    const urlSize = sizeParam ? Number.parseInt(sizeParam, 10) : defaultSize;

    if (urlPage !== currentPage) {
      setCurrentPageState(urlPage);
    }
    if (urlSize !== pageSize) {
      setPageSizeState(urlSize);
    }
  }, [searchParams, currentPage, pageSize, defaultPage, defaultSize]);

  return {
    currentPage,
    pageSize,
    totalPages,
    totalElements,
    setCurrentPage,
    setPageSize,
    setTotalPages,
    setTotalElements,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    hasNextPage,
    hasPreviousPage,
  };
}
