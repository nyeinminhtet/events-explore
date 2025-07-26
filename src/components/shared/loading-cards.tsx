import { Calendar, Clock, MapPin } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingCards = () => {
  return (
    <section>
      <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <Card
            key={index}
            className="group flex h-full cursor-pointer flex-col transition-shadow duration-200 hover:shadow-md"
          >
            <CardHeader className="pb-3">
              <div className="mb-2 flex items-start justify-between">
                {/* Realistic badge with event type colors */}
                <div className="inline-flex animate-pulse items-center rounded-full border bg-gradient-to-r from-purple-100 to-indigo-100 px-2.5 py-0.5 text-xs font-semibold text-transparent">
                  <Skeleton className="h-4 w-16 bg-transparent" />
                </div>
                <div className="text-right text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4 text-gray-400" />
                    <Skeleton className="h-4 w-16 bg-gray-200" />
                  </div>
                </div>
              </div>
              {/* Title with realistic length */}
              <div className="space-y-1 text-lg leading-tight font-semibold">
                <Skeleton className="h-6 w-5/6 bg-gray-300" />
                <Skeleton className="h-6 w-3/5 bg-gray-300" />
              </div>
            </CardHeader>

            {/* Image placeholder with gradient */}
            <div className="relative h-48 overflow-hidden">
              <div className="relative h-full w-full animate-pulse bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200">
                {/* Subtle pattern overlay */}
                <div className="absolute inset-0 opacity-20">
                  <div className="animate-shimmer h-full w-full bg-gradient-to-r from-transparent via-white to-transparent" />
                </div>
              </div>
              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent transition-all duration-200 group-hover:from-black/10" />
            </div>

            <CardContent className="flex-1 pb-3">
              {/* Description with realistic line breaks */}
              <div className="mb-3 space-y-2 text-sm leading-relaxed text-gray-600">
                <Skeleton className="h-4 w-full bg-gray-200" />
                <Skeleton className="h-4 w-4/5 bg-gray-200" />
                <Skeleton className="h-4 w-2/3 bg-gray-200" />
              </div>

              {/* Location and time with icons */}
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <Skeleton className="h-4 w-36 bg-gray-200" />
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <Skeleton className="h-4 w-24 bg-gray-200" />
                </div>
              </div>
            </CardContent>

            <CardFooter className="pt-3">
              {/* Button with hover effect */}
              <div className="flex h-10 w-full animate-pulse items-center justify-center rounded-md bg-gradient-to-r from-gray-200 to-gray-300 transition-all duration-200">
                <Skeleton className="h-4 w-24 bg-transparent" />
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default LoadingCards;
