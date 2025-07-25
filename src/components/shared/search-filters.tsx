import { useEffect, useState } from "react";

import { format } from "date-fns";
import { useDebouncedCallback } from "use-debounce";
import { Search, CalendarIcon, X } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { fetchEventClassifications } from "@/lib/data";

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  locationQuery,
  onLocationChange,
  onSearchChange,
  selectedEventType,
  onEventTypeChange,
  dateRange,
  onDateRangeChange,
  onClearFilters,
  loading = false,
}) => {
  const [search, setSearch] = useState(searchQuery);
  const [location, setLocation] = useState(locationQuery);

  const debouncedSearch = useDebouncedCallback(onSearchChange, 500);
  const debouncedLocation = useDebouncedCallback(onLocationChange, 500);

  const hasActiveFilters =
    searchQuery ||
    locationQuery ||
    selectedEventType ||
    dateRange.from ||
    dateRange.to;

  const [eventTypes, setEventTypes] = useState<string[]>([
    "Music",
    "Sports",
    "Arts & Theatre",
    "Film",
    "Miscellaneous",
  ]);

  useEffect(() => {
    const loadClassifications = async () => {
      try {
        const classifications = await fetchEventClassifications();
        if (classifications.length > 0) {
          setEventTypes(classifications);
        }
      } catch (error) {
        console.error("Failed to load event classifications:", error);
      }
    };

    loadClassifications();
  }, []);

  return (
    <div className="mb-8 rounded-lg border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            className="ml-auto text-gray-500 hover:text-gray-700"
            disabled={loading}
          >
            <X className="mr-1 h-4 w-4" />
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {/* Search Input */}
        <div className="space-y-2">
          <Label htmlFor="search">Search Events</Label>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              id="search"
              placeholder="Search by title..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                debouncedSearch(e.target.value);
              }}
              className="pl-10"
              disabled={loading}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">City</Label>
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              id="location"
              placeholder="City, State (e.g., Los Angeles, CA)"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                debouncedLocation(e.target.value);
              }}
              className="pl-10"
              disabled={loading}
            />
          </div>
        </div>

        {/* Event Type Filter */}
        <div className="space-y-2">
          <Label>Event Type</Label>
          <Select
            value={selectedEventType}
            onValueChange={onEventTypeChange}
            disabled={loading}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Event</SelectItem>
              {eventTypes.map((type) => (
                <SelectItem key={type} value={type.toLowerCase()}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date From */}
        <div className="space-y-2">
          <Label>From Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent text-left font-normal"
                disabled={loading}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.from ? format(dateRange.from, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.from || undefined}
                onSelect={(date) =>
                  onDateRangeChange({ ...dateRange, from: date || null })
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Date To */}
        <div className="space-y-2">
          <Label>To Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent text-left font-normal"
                disabled={loading}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange.to ? format(dateRange.to, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateRange.to || undefined}
                onSelect={(date) =>
                  onDateRangeChange({ ...dateRange, to: date || null })
                }
                initialFocus
                disabled={(date) =>
                  dateRange.from ? date < dateRange.from : false
                }
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;
