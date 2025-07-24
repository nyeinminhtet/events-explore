import { lazy, Suspense } from "react";

import Header from "./components/shared/header";
import LoadingCards from "./components/shared/loading-cards";

const EventsContainer = lazy(
  () => import("./components/shared/events-container"),
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <Suspense fallback={<LoadingCards />}>
        <EventsContainer />
      </Suspense>
    </div>
  );
}

export default App;
