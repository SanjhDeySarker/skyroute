import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import SeatMap from "../components/SeatMap";

export default function FlightDetails() {
  const { id } = useParams();            // flight ID from URL: /flight/:id
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await api.get(`/flights/${id}`);
        setFlight(res.data);
      } catch (err) {
        console.error("Error fetching flight:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFlight();
  }, [id]);

  // Called by SeatMap after selection changes
  const handleSeatSelection = (seats) => {
    setSelectedSeats(seats);
  };

  const goToCheckout = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    navigate("/checkout", {
      state: {
        flight,
        selectedSeats
      }
    });
  };

  if (loading) return <p className="p-6 text-gray-600">Loading flight details...</p>;

  if (!flight) return <p className="p-6 text-red-600">Flight not found.</p>;

  return (
    <div className="p-6">
      {/* TOP SECTION */}
      <h1 className="text-3xl font-bold text-blue-700 mb-4">
        {flight.airline} — {flight.flightNumber}
      </h1>

      {/* ROUTE */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-semibold">{flight.source}</p>
            <p className="text-gray-500">Departure</p>
          </div>

          <div className="text-center">
            <p className="text-gray-400 text-xl">✈️</p>
            <p className="text-gray-600 text-sm">{flight.duration}</p>
          </div>

          <div>
            <p className="text-2xl font-semibold">{flight.destination}</p>
            <p className="text-gray-500">Arrival</p>
          </div>
        </div>

        <p className="text-gray-700 mt-3">
          Departure Time: <strong>{new Date(flight.departureTime).toLocaleString()}</strong>
        </p>
        <p className="text-gray-700">
          Price Per Seat: <strong className="text-green-600 text-xl">₹ {flight.basePrice}</strong>
        </p>
      </div>

      {/* SEAT MAP */}
      <h2 className="text-2xl font-bold mb-3">Select Your Seats</h2>
      <SeatMap
        flightId={flight._id}
        userId={user?._id}
        initialSeats={flight.seats}
        onSelectionChange={handleSeatSelection}
      />

      {/* CHECKOUT BUTTON */}
      <div className="mt-6 text-right">
        <button
          onClick={goToCheckout}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Continue to Checkout ({selectedSeats.length} seat(s))
        </button>
      </div>
    </div>
  );
}
