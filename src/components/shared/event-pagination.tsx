import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  SelectContent,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
      {/* Results info */}
      <div className="text-xs text-gray-600 md:w-[30%]">
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
