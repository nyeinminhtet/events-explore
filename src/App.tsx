import Header from "./components/shared/header";
import EventsContainer from "./components/shared/events-container";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <EventsContainer />
    </div>
  );
}

export default App;
