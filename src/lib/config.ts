type TConfig = {
  apiKey: string;
};

export const config: TConfig = {
  apiKey: import.meta.env.VITE_TICKETMASTER_API_KEY,
};
