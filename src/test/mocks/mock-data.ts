export const mockEvent: TEvent = {
  id: "test-event-1",
  title: "Test Concert Event",
  description: "This is a test concert event for testing purposes.",
  location: "San Francisco, CA",
  venue: "Test Venue",
  dateTime: "2024-03-15T19:00:00Z",
  eventType: "Music",
  organizer: "Test Organizer",
  price: "$50 - $100",
  imageUrl: "https://example.com/test-image.jpg",
  ticketUrl: "https://example.com/tickets",
  pleaseNote: "Please arrive 30 minutes early",
};

export const mockEvents: TEvent[] = [
  mockEvent,
  {
    id: "test-event-2",
    title: "Test Sports Event",
    description: "This is a test sports event.",
    location: "Los Angeles, CA",
    venue: "Sports Arena",
    dateTime: "2024-03-20T15:00:00Z",
    eventType: "Sports",
    organizer: "Sports Org",
    price: "$25 - $75",
  },
  {
    id: "test-event-3",
    title: "Test Workshop",
    description: "Educational workshop event.",
    location: "New York, NY",
    venue: "Conference Center",
    dateTime: "2024-03-25T10:00:00Z",
    eventType: "Workshop",
    organizer: "Education Corp",
    price: "$30",
  },
];

export const mockTicketmasterResponse = {
  _embedded: {
    events: [
      {
        id: "tm-event-1",
        name: "Ticketmaster Test Event",
        info: "Test event from Ticketmaster API",
        url: "https://ticketmaster.com/event/1",
        locale: "en-us",
        images: [
          {
            url: "https://example.com/image.jpg",
            width: 640,
            height: 360,
            fallback: false,
          },
        ],
        dates: {
          start: {
            localDate: "2024-04-01",
            localTime: "20:00:00",
            dateTime: "2024-04-01T20:00:00Z",
          },
          timezone: "America/Los_Angeles",
          status: {
            code: "onsale",
          },
        },
        classifications: [
          {
            primary: true,
            segment: {
              id: "KZFzniwnSyZfZ7v7nJ",
              name: "Music",
            },
            genre: {
              id: "KnvZfZ7vAeA",
              name: "Rock",
            },
          },
        ],
        _embedded: {
          venues: [
            {
              name: "Test Venue",
              city: {
                name: "San Francisco",
              },
              state: {
                name: "California",
                stateCode: "CA",
              },
              country: {
                name: "United States Of America",
                countryCode: "US",
              },
            },
          ],
        },
        priceRanges: [
          {
            type: "standard",
            currency: "USD",
            min: 50,
            max: 150,
          },
        ],
        promoter: {
          id: "promoter-1",
          name: "Test Promoter",
        },
      },
    ],
  },
  page: {
    size: 20,
    totalElements: 100,
    totalPages: 5,
    number: 0,
  },
};
