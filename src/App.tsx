import { lazy, Suspense } from "react";

import useEvents from "./hooks/use-events";
import Header from "./components/shared/header";
import { LoadingSpinner } from "./components/shared/loading-spinner";

const EventsContainer = lazy(
  () => import("./components/shared/events-container"),
);

function App() {
  const { events } = useEvents();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* <EventsContainer events={events} /> */}
      <Suspense fallback={<LoadingSpinner />}>
        <EventsContainer events={events} />
      </Suspense>
    </div>
  );
}

export default App;
