import { useNavigate } from "react-router-dom";
import { useCompare } from "../context/CompareContext";

export default function CompareBar() {
  const navigate = useNavigate();
  const { compareFlights, clearCompare } = useCompare();

  // Show bar only when at least 2 flights are selected
  if (compareFlights.length < 2) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-blue-600 dark:bg-blue-700 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* LEFT: Info */}
        <div>
          <p className="font-semibold">
            {compareFlights.length} flights selected for comparison
          </p>
          <p className="text-sm opacity-90">
            Compare price, duration & schedule
          </p>
        </div>

        {/* RIGHT: Actions */}
        <div className="flex gap-3">
          <button
            onClick={clearCompare}
            className="bg-blue-500 hover:bg-blue-400 px-4 py-2 rounded text-sm"
          >
            Clear
          </button>

          <button
            onClick={() => navigate("/compare")}
            className="bg-white text-blue-600 hover:bg-gray-100 px-5 py-2 rounded font-semibold"
          >
            Compare Now
          </button>
        </div>

      </div>
    </div>
  );
}
