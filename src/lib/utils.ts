import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getEventTypeColor = (eventType: string) => {
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
};
