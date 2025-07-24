import { useCallback } from "react";

import { Calendar, MapPin, Clock } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { TEvent } from "../../lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  event: TEvent;
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  const formatTime = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }, []);

  const truncateDescription = useCallback((text: string, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }, []);

  const getEventImage = useCallback((event: TEvent) => {
    if (event.imageUrl) {
      return event.imageUrl;
    }
    // Fallback to placeholder
    return `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(event.title)}`;
  }, []);

  const getEventTypeColor = useCallback((eventType: string) => {
    const colors: Record<string, string> = {
      Music: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
      Baseball: "bg-orange-100 text-orange-800 hover:bg-orange-200",
      Theatre: "bg-rose-100 text-rose-800 hover:bg-rose-200",
      "Performance Art": "bg-pink-100 text-pink-800 hover:bg-pink-200",
      Football: "bg-lime-100 text-lime-800 hover:bg-lime-200",
      Equestrian: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      Conference: "bg-sky-100 text-sky-800 hover:bg-sky-200",
      Meetup: "bg-teal-100 text-teal-800 hover:bg-teal-200",
      Workshop: "bg-amber-100 text-amber-800 hover:bg-amber-200",
      Concert: "bg-fuchsia-100 text-fuchsia-800 hover:bg-fuchsia-200",
      "Tech Talk": "bg-blue-100 text-blue-800 hover:bg-blue-200",
    };

    return colors[eventType] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
  }, []);

  return (
    <Card className="group flex h-full cursor-pointer flex-col transition-shadow duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="mb-2 flex items-start justify-between">
          <Badge className={`${getEventTypeColor(event.eventType)} border-0`}>
            {event.eventType}
          </Badge>
          <div className="text-right text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              {formatDate(event.dateTime)}
            </div>
          </div>
        </div>
        <h3 className="group-hover:text-muted-foreground text-lg leading-tight font-semibold transition-colors">
          {event.title}
        </h3>
      </CardHeader>

      <div className="relative h-48 overflow-hidden">
        <img
          src={getEventImage(event) || "/placeholder.svg"}
          alt={event.title}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `/placeholder.svg?height=200&width=400&text=${encodeURIComponent(event.title)}`;
          }}
        />
      </div>

      <CardContent className="flex-1 pb-2">
        <p className="mb-3 text-sm leading-relaxed text-gray-600">
          {truncateDescription(event.description)}
        </p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
            <span>{formatTime(event.dateTime)}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button
          onClick={onClick}
          className="group-hover:bg-primary/70 w-full rounded-sm transition-colors"
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
