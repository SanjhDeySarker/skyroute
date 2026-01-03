import { useCompare } from "../context/CompareContext";
import { useNavigate } from "react-router-dom";

export default function Compare() {
  const { compareFlights, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareFlights.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">
          No flights selected for comparison
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Please select flights from the search results to compare.
        </p>
        <button
          onClick={() => navigate("/flights")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Go to Flights
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Compare Flights ✈️
        </h1>

        <button
          onClick={clearCompare}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Clear All
        </button>
      </div>

      {/* COMPARISON GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {compareFlights.map((flight) => (
          <div
            key={flight._id}
            className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow p-5"
          >

            {/* REMOVE */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => removeFromCompare(flight._id)}
                className="text-sm text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>

            {/* AIRLINE */}
            <h2 className="text-xl font-bold mb-1">
              {flight.airline}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Flight {flight.flightNumber}
            </p>

            {/* ROUTE */}
            <div className="mb-3">
              <p className="font-semibold">
                {flight.source} → {flight.destination}
              </p>
            </div>

            {/* TIMES */}
            <div className="mb-3 text-sm">
              <p>
                <strong>Departure:</strong>{" "}
                {new Date(flight.departureTime).toLocaleTimeString()}
              </p>
              <p>
                <strong>Arrival:</strong>{" "}
                {new Date(flight.arrivalTime).toLocaleTimeString()}
              </p>
            </div>

            {/* DETAILS */}
            <div className="mb-3 text-sm">
              <p>
                <strong>Duration:</strong> {flight.duration}
              </p>
              <p>
                <strong>Stops:</strong>{" "}
                {flight.stops === 0 ? "Non-stop" : flight.stops}
              </p>
            </div>

            {/* PRICE */}
            <div className="mt-4">
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ₹ {flight.dynamicPrice || flight.basePrice}
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={() => navigate(`/flights/${flight._id}`)}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
            >
              Select This Flight
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}
