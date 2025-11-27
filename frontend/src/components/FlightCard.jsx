import { Link } from "react-router-dom";

export default function FlightCard({ flight }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-xl transition duration-200">

      {/* Airline + Flight Number */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-blue-700">{flight.airline}</h2>
        <p className="text-gray-600 text-sm">#{flight.flightNumber}</p>
      </div>

      {/* Route */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-semibold">{flight.source}</p>
          <p className="text-gray-500 text-sm">Departure</p>
        </div>

        <div className="text-center">
          <p className="text-gray-400">✈️</p>
          <p className="text-gray-600 text-xs">{flight.duration}</p>
        </div>

        <div>
          <p className="text-2xl font-semibold">{flight.destination}</p>
          <p className="text-gray-500 text-sm">Arrival</p>
        </div>
      </div>

      {/* Prices & availability */}
      <div className="flex justify-between items-center mt-4">
        <p className="text-xl font-bold text-green-600">
          ₹ {flight.dynamicPrice || flight.basePrice}
        </p>

        <p className="text-sm text-gray-500">
          Seats left: <span className="font-semibold">{flight.availableSeats}</span>
        </p>
      </div>

      {/* View Details Button */}
      <div className="text-right mt-4">
        <Link
          to={`/flight/${flight._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>

    </div>
  );
}
