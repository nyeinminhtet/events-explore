import { useCallback } from "react";

import { Calendar, MapPin, User, Users, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getEventTypeColor } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EventDetailsModalProps {
  event: TEvent;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  isOpen,
  onClose,
}) => {
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] max-w-[90vw] overflow-y-auto px-2 md:max-w-2xl lg:px-4 lg:pb-0">
        <DialogHeader>
          <div className="flex flex-col items-start gap-y-2">
            <Badge
              className={`${getEventTypeColor(event.eventType)} mb-2 border-0`}
            >
              {event.eventType}
            </Badge>
            <DialogTitle className="pr-4 text-lg leading-tight font-semibold md:text-2xl">
              {event.title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Event Details Grid */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <Calendar className="mr-3 h-5 w-5 text-blue-500" />
                <div>
                  <p className="font-medium">{formatDate(event.dateTime)}</p>
                  <p className="text-sm text-gray-500">
                    {formatTime(event.dateTime)}
                  </p>
                </div>
              </div>

              <div className="flex items-center text-gray-600">
                <MapPin className="mr-3 h-5 w-5 text-red-500" />
                <div>
                  <p className="font-medium">{event.location}</p>
                  <p className="text-sm text-gray-500">{event.venue}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-gray-600">
                <User className="mr-3 h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Organizer</p>
                  <p className="text-sm text-gray-500">{event.organizer}</p>
                </div>
              </div>

              {event.attendeeLimit && (
                <div className="flex items-center text-gray-600">
                  <Users className="mr-3 h-5 w-5 text-purple-500" />
                  <div>
                    <p className="font-medium">Capacity</p>
                    <p className="text-sm text-gray-500">
                      {event.attendeeLimit} attendees
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Description */}
          <div>
            <h4 className="mb-3 text-lg font-semibold">About This Event</h4>
            <div className="prose prose-sm max-w-none">
              <p className="leading-relaxed whitespace-pre-line text-gray-700">
                {event.description}
              </p>
            </div>
          </div>

          {/* Price */}
          {event.price && (
            <>
              <Separator />
              <div>
                <h3 className="mb-2 text-lg font-semibold">Pricing</h3>
                <p className="text-2xl font-bold text-green-600">
                  {event.price}
                </p>
              </div>
            </>
          )}

          {/* Please Note */}
          {event.pleaseNote && (
            <>
              <Separator />
              <div>
                <h3 className="mb-2 text-lg font-semibold">
                  Important Information
                </h3>
                <p className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs font-light text-amber-700">
                  {event.pleaseNote}
                </p>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="sticky -bottom-1 bg-white py-5">
            {event.ticketUrl ? (
              <Button asChild className="w-full" size="lg">
                <a
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Buy Tickets on Ticketmaster
                </a>
              </Button>
            ) : (
              <Button className="w-full" size="lg" disabled>
                Tickets Not Available
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
