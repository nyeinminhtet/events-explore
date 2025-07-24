import "./App.css";
import { Button } from "./components/ui/button";

function App() {
  return (
    <main className="bg-amber-50 p-4 text-red-50 md:p-4">
      <div className="relative mt-2 mr-4 mb-4 ml-2 flex flex-col items-center justify-between gap-2 rounded-lg bg-blue-200 p-4 text-right text-red-500 shadow-md">
        Hello via Vite!
        <Button
          variant={"destructive"}
          className="cursor-pointer"
          onClick={() => alert("clicked")}
        >
          Click me
        </Button>
      </div>
    </main>
  );
}

export default App;
