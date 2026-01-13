import { useCompare } from "../context/CompareContext";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function FlightCard({ flight, onSelect }) {
  const { addToCompare } = useCompare();

  const price = flight.dynamicPrice || flight.basePrice;

  return (
    <Card className="p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">

      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold">
            {flight.airline}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {flight.flightNumber}
          </p>
        </div>

        <button
          onClick={() => addToCompare(flight)}
          className="text-sm text-blue-600 dark:text-blue-400 underline hover:opacity-80"
        >
          Compare
        </button>
      </div>

      {/* ROUTE */}
      <div className="mt-3 text-sm">
        <p className="font-semibold">
          {flight.source} → {flight.destination}
        </p>
        <p className="text-gray-600 dark:text-gray-400">
          ⏱ {flight.duration}
        </p>
      </div>

      {/* PRICE */}
      <p className="mt-4 text-2xl font-extrabold text-green-600 dark:text-green-400">
        ₹ {price}
      </p>

      {/* CTA */}
      <Button
        onClick={() => onSelect(flight)}
        className="w-full mt-4"
      >
        Select Flight
      </Button>

    </Card>
  );
}
