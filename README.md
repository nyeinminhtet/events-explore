# Events Explorer

A responsive web application for exploring, searching, and filtering public events. Built with React, TypeScript, and Shadcn/UI and Tailwind CSS.

## 🚀 Features

- **Event Listing**: Browse events with pagination
- **Advanced Search**: Search by title or location
- **Smart Filtering**: Filter by event type and date range
- **Event Details**: Detailed modal view for each event
- **Responsive Design**: Optimized for mobile, tablet, and desktop

## 🛠️ Tech Stack

- **Frontend**: ReactJs, TypeScript
- **Styling**: Tailwind CSS, Shadcn/UI, Radix UI
- **Build Tool**: Vite
- **Code Quality**: ESLint, Prettier
- **Package Manager**: Bun (recommended) or npm

## 📦 Installation

1.  Clone the Repository

```bash
git clone https://github.com/nyeinminhtet/events-explore.git
cd events-explore

```

2.  Install dependencies:

```bash

# Using Bun (recommended)

bun install

# Or using npm

npm install
```

3.  Start the development server:

```bash

## Using Bun

bun dev

## Or using npm

npm run dev
```

4.  Open your browser and navigate to \`http://localhost:3000\`

## 🔑 Ticketmaster API Setup

This application uses the Ticketmaster Discovery API to fetch real event data.

### Getting Your API Key

1. Visit the [Ticketmaster Developer Portal](https://developer.ticketmaster.com/)
2. Create a free account or sign in
3. Go to "My Apps" and create a new application
4. Copy your Consumer Key (this is your API key)

### Configuration

1. Copy the environment variables template:

   ```bash
   cp .env.example .env.local
   ```

2. Add your Ticketmaster API key to `.env.local`:

   ```bash
   VITE_TICKETMASTER_API_KEY=your_actual_api_key_here
   ```

3. Restart your development server:
   ```bash
   bun dev
   ```

### API Features Used

- **Event Search**: Search events by keyword, location, and date
- **Event Classifications**: Dynamic event type filters
- **Event Details**: Complete event information including images and ticket links
- **Pagination**: Handle large result sets efficiently

## 🎯 Key Features Implementation

### Event Listing

- Displays events in a responsive grid layout
- Each event card shows title, description (truncated), location, date/time, and event type
- Pagination with configurable items per page

### Search & Filtering

- **Text Search**: Search by event title or location
- **Event Type Filter**: Filter by Workshop, Concert, Meetup, Conference, Festival, Sports
- **Date Range Filter**: Filter events by start and end dates
- **Combined Filtering**: All filters work together seamlessly

### Event Details Modal

- Full event information including complete description
- Organizer details and attendee limits
- Responsive modal design with smooth animations

### Responsive Design

- Mobile-first approach with Tailwind CSS
- Breakpoints: mobile (default), tablet (md:), desktop (lg:)
- Optimized layouts for all screen sizes

## 🔧 Available Scripts

```bash

# Development

bun dev # Start development server
npm run dev

# Building

bun run build # Build for production
npm run build

# Linting & Formatting

bun run lint # Run ESLint
npm run lint

bun run format # Format code with Prettier
npm run format
```

## 🎨 Design Decisions

### Component Architecture

- **Modular Components**: Each feature is broken into reusable components
- **Props Interface**: TypeScript interfaces for type safety
- **Custom Hooks**: Separated logic from presentation where appropriate

### State Management

- **Local State**: Using React's useState for component-level state
- **Derived State**: useMemo for computed values like filtered events
- **Effect Management**: useEffect for side effects and API simulation

### Styling Approach

- **Utility-First**: Tailwind CSS for rapid development
- **Component Library**: Shadcn/UI for consistent, accessible components
- **Responsive Design**: Mobile-first with progressive enhancement

## 🚀 Performance Optimizations

- **Memoization**: useMemo for expensive filtering operations
- **Pagination**: Limits DOM nodes for better performance
- **Lazy Loading**: Components loaded only when needed
- **Optimized Re-renders**: Proper dependency arrays in useEffect

## 🤝 Trade-offs & Assumptions

### Trade-offs Made

1. **Mock Data vs Real API**: Used mock data for faster development and demo purposes
2. **Client-side Filtering**: All filtering done in browser
3. **Simple Pagination**: Basic pagination instead of infinite scroll for clarity
4. **Local State**: No global state management to keep the app simple

### Assumptions

1. **Event Data Structure**: Assumed Ticketmaster-like API structure
2. **User Behavior**: Assumed users primarily browse and search events
3. **Device Usage**: Assumed mobile-first usage pattern
4. **Performance**: Assumed reasonable dataset size for client-side operations

## 🔮 Future Enhancements

Given more time, I would implement:

### Technical Improvements

- **Real API Integration**: Connect to Ticketmaster Discovery API
- **Infinite Scrolling**: Replace pagination with infinite scroll
- **Caching**: Implement query caching with React Query
- **PWA Features**: Service worker for offline functionality
- **Testing**: Unit and integration tests with Jest/Testing Library

### Feature Enhancements

- **User Authentication**: Save favorite events and preferences
- **Advanced Filters**: Price range, distance radius, accessibility options
- **Social Features**: Share events, invite friends
- **Calendar Integration**: Add events to personal calendar
- **Geolocation**: Location-based event recommendations

### UX Improvements

- **Skeleton Loading**: Better loading states
- **Error Boundaries**: Graceful error handling
- **Accessibility**: Enhanced ARIA labels and keyboard navigation
- **Dark Mode**: Theme switching capability


