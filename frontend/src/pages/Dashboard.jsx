import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's bookings
  const loadBookings = async () => {
    try {
      const res = await api.get("/bookings/my");
      setBookings(res.data);
    } catch (err) {
      console.error("Error loading bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // Cancel booking handler
  const cancelBooking = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await api.put(`/bookings/${id}/cancel`);
      loadBookings();
    } catch (error) {
      alert("Could not cancel booking");
      console.error(error);
    }
  };

  if (loading) return <p className="p-6 text-gray-600">Loading your bookings...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-3xl font-bold text-blue-700 mb-6">
        My Bookings
      </h1>

      {bookings.length === 0 && (
        <p className="text-gray-500">You have no bookings yet.</p>
      )}

      <div className="space-y-5">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white shadow-md border border-gray-200 p-5 rounded-lg"
          >
            {/* Flight Info */}
            <h2 className="text-xl font-semibold text-blue-700">
              {b.flight.airline} — {b.flight.flightNumber}
            </h2>

            <p className="text-gray-700">
              {b.flight.source} → {b.flight.destination}
            </p>

            <p className="text-gray-700 mt-1">
              Seats: <strong>{b.seats.join(", ")}</strong>
            </p>

            <p className="text-gray-700">
              Amount Paid:{" "}
              <strong className="text-green-600">₹ {b.amountPaid}</strong>
            </p>

            <p className="mt-1">
              Status:{" "}
              <span
                className={
                  b.status === "confirmed"
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {b.status.toUpperCase()}
              </span>
            </p>

            {/* Buttons */}
            <div className="flex justify-between mt-4">

              {/* View booking */}
              <button
                onClick={() =>
                  navigate("/confirmation", { state: { booking: b } })
                }
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                View Ticket
              </button>

              {/* Cancel booking */}
              {b.status !== "cancelled" && (
                <button
                  onClick={() => cancelBooking(b._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
