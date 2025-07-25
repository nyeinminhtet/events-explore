import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEventTypeColor = (eventType: string) => {
  const colors: Record<string, string> = {
    Music: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    Sports: "bg-red-100 text-red-800 hover:bg-red-200",
    "Arts & Theatre": "bg-pink-100 text-pink-800 hover:bg-pink-200",
    Film: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    Miscellaneous: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    Workshop: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    Concert: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    Meetup: "bg-green-100 text-green-800 hover:bg-green-200",
    Conference: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    Festival: "bg-pink-100 text-pink-800 hover:bg-pink-200",
  };

  return colors[eventType] || "bg-gray-100 text-gray-800 hover:bg-gray-200";
};
