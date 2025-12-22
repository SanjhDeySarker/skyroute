import { useLocation, useNavigate } from "react-router-dom";

export default function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.booking) {
    return <p className="p-6 text-red-600">No booking data found.</p>;
  }

  const { booking } = state;

  const downloadBoardingPass = () => {
    const link = document.createElement("a");
    link.href = `${import.meta.env.VITE_API_URL}/api/bookings/${booking._id}/boarding-pass`;
    link.setAttribute("download", `SkyRoute_BoardingPass_${booking._id}.pdf`);
    link.click();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* Title */}
      <h1 className="text-3xl font-bold text-green-600 mb-2">
        🎉 Booking Confirmed!
      </h1>

      <p className="text-gray-600 mb-6">
        Your flight booking has been successfully completed.
      </p>

      {/* Booking Summary */}
      <div className="bg-white shadow-md rounded-lg p-5 border mb-6">
        <h2 className="text-2xl font-semibold mb-3">Booking Summary</h2>

        <p><strong>Booking ID:</strong> {booking._id}</p>
        <p>
          <strong>Status:</strong>{" "}
          <span className="text-green-600 font-bold">
            {booking.status.toUpperCase()}
          </span>
        </p>
        <p>
          <strong>Payment:</strong>{" "}
          <span className="text-blue-600 font-bold">
            {booking.paymentStatus.toUpperCase()}
          </span>
        </p>

        <p className="mt-2">
          <strong>Total Paid:</strong>{" "}
          <span className="text-green-600 font-bold">
            ₹ {booking.amountPaid}
          </span>
        </p>
      </div>

      {/* SINGLE FLIGHT BOOKING */}
      {booking.flight && (
        <div className="bg-white shadow-md rounded-lg p-5 border mb-6">
          <h3 className="text-xl font-semibold mb-2">Flight Details</h3>

          <p>
            <strong>{booking.flight.airline}</strong> —{" "}
            {booking.flight.flightNumber}
          </p>
          <p>
            {booking.flight.source} → {booking.flight.destination}
          </p>
          <p>
            Departure:{" "}
            {new Date(booking.flight.departureTime).toLocaleString()}
          </p>
          <p>
            Seats: <strong>{booking.seats.join(", ")}</strong>
          </p>
        </div>
      )}

      {/* MULTI-CITY / ROUND-TRIP */}
      {booking.legs && booking.legs.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-5 border mb-6">
          <h3 className="text-xl font-semibold mb-3">
            Multi-City / Round-Trip Itinerary
          </h3>

          {booking.legs.map((leg, index) => (
            <div key={index} className="border-b py-3 last:border-b-0">
              <p className="font-semibold">
                Leg {index + 1}: {leg.flight.airline} —{" "}
                {leg.flight.flightNumber}
              </p>
              <p>
                {leg.flight.source} → {leg.flight.destination}
              </p>
              <p>
                Departure:{" "}
                {new Date(leg.flight.departureTime).toLocaleString()}
              </p>
              <p>
                Seats: <strong>{leg.seats.join(", ")}</strong>
              </p>
            </div>
          ))}
        </div>
      )}

      {/* PASSENGERS */}
      <div className="bg-white shadow-md rounded-lg p-5 border mb-6">
        <h3 className="text-xl font-semibold mb-3">Passengers</h3>

        {(booking.passengers || booking.legs?.[0]?.passengers || []).map(
          (p, i) => (
            <div key={i} className="border-b py-2 last:border-b-0">
              <p><strong>Name:</strong> {p.name}</p>
              <p><strong>Age:</strong> {p.age}</p>
              <p><strong>Gender:</strong> {p.gender}</p>
            </div>
          )
        )}
      </div>

      {/* ACTION BUTTONS */}
      <button
        onClick={downloadBoardingPass}
        className="w-full mb-4 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
      >
        Download Boarding Pass (PDF)
      </button>

      <div className="flex justify-between">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Go Home
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          View My Bookings
        </button>
      </div>
    </div>
  );
}
