import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  SelectContent,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

const EventsPagination: React.FC<EventsPaginationProps> = ({
  loading = false,
  pagination,
}) => {
  const {
    currentPage,
    pageSize,
    totalPages,
    totalElements,
    goToNextPage,
    goToPage,
    goToPreviousPage,
    setPageSize,
  } = pagination || {};

  // Don't render if no pages
  if (totalPages <= 1) return null;

  // Generate page numbers to show
  const getVisiblePages = () => {
    // If total pages is 5 or less, show all pages
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Always show exactly 6 items
    const visiblePages = [];

    if (currentPage <= 3) {
      // Show: 1, 2, 3, 4, ..., current + 6
      visiblePages.push(1, 2, 3, 4, "...", currentPage + 6);
    } else if (currentPage >= totalPages - 2) {
      // Show: 1, ..., current-2, current-1, last
      visiblePages.push(
        1,
        "...",
        currentPage - 2,
        currentPage - 1,
        currentPage,
      );
    } else {
      // Show: 1, current-1, current, ..., current + 6
      visiblePages.push(
        1,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        currentPage + 6,
      );
    }

    // Return only first 6 items to ensure exactly 6  items
    return visiblePages.slice(0, 6);
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Results info */}
      <div className="text-xs text-gray-600 md:text-[10px] lg:w-[30%] lg:text-xs">
        <span className="w-full">
          Showing {Math.min((currentPage - 1) * pageSize + 1, totalElements)} to{" "}
          {Math.min(currentPage * pageSize, totalElements)} of {totalElements}{" "}
          results
        </span>
      </div>

      {/* Pagination controls */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!loading) goToPreviousPage();
              }}
              className={
                loading || currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>

          {visiblePages.map((page, index) => (
            <PaginationItem key={index}>
              {page === "..." ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!loading && typeof page === "number") goToPage(page);
                  }}
                  size={"sm"}
                  isActive={page === currentPage}
                  className={loading ? "pointer-events-none opacity-50" : ""}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (!loading) goToNextPage();
              }}
              className={
                loading || currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      {/* Page size selector */}
      <div className="flex items-center gap-2">
        <span className="text-xs md:text-sm">Show:</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => setPageSize(Number.parseInt(value, 10))}
          disabled={loading}
        >
          <SelectTrigger className="h-8 w-20 cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="9">9</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="18">18</SelectItem>
            <SelectItem value="24">24</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EventsPagination;
