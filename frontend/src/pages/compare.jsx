import { useCompare } from "../context/CompareContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Compare() {
  const { compareFlights, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();

  if (compareFlights.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6">
        <h2 className="text-2xl font-bold mb-2">
          No flights selected for comparison
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Select flights from search results to compare.
        </p>
        <Button onClick={() => navigate("/flights")}>
          Go to Flights
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white p-6">

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Compare Flights ✈️
        </h1>

        <Button variant="danger" onClick={clearCompare}>
          Clear All
        </Button>
      </div>

      {/* COMPARISON GRID */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {compareFlights.map((flight) => {
          const price = flight.dynamicPrice || flight.basePrice;

          return (
            <Card
              key={flight._id}
              className="p-5 transition-all duration-300 hover:shadow-2xl"
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
              <p className="font-semibold mb-2">
                {flight.source} → {flight.destination}
              </p>

              {/* TIME */}
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
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
              <div className="text-sm mb-3">
                <p>
                  <strong>Duration:</strong> {flight.duration}
                </p>
                <p>
                  <strong>Stops:</strong>{" "}
                  {flight.stops === 0 ? "Non-stop" : flight.stops}
                </p>
              </div>

              {/* PRICE */}
              <p className="text-2xl font-extrabold text-green-600 dark:text-green-400 mb-4">
                ₹ {price}
              </p>

              {/* CTA */}
              <Button
                className="w-full"
                onClick={() => navigate(`/flights/${flight._id}`)}
              >
                Select This Flight
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
