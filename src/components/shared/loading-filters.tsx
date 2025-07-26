import { Search, CalendarIcon } from "lucide-react";

import { Skeleton } from "@/components/ui";

const LoadingFilters = () => {
  return (
    <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search Input */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-300" />
            <Skeleton className="h-10 w-full rounded-md pl-10" />
          </div>
        </div>

        {/* Event Type Filter */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Date From */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16" />
          <div className="relative">
            <CalendarIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-300" />
            <Skeleton className="h-10 w-full rounded-md pl-10" />
          </div>
        </div>

        {/* Date To */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-14" />
          <div className="relative">
            <CalendarIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-300" />
            <Skeleton className="h-10 w-full rounded-md pl-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingFilters;
