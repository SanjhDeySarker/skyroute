import { useLocation, useNavigate } from "react-router-dom";

export default function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.booking) {
    return <p className="p-6 text-red-600">No booking data found.</p>;
  }

  const { booking } = state;

  return (
    <div className="p-6 max-w-2xl mx-auto">

      {/* Title */}
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        🎉 Booking Confirmed!
      </h1>

      <p className="text-gray-600 mb-6">
        Your flight booking has been successfully completed.
      </p>

      {/* Booking Summary Box */}
      <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200">

        <h2 className="text-2xl font-semibold mb-3">Booking Details</h2>

        <p className="text-gray-700">
          <strong>Booking ID:</strong> {booking._id}
        </p>

        <p className="text-gray-700 mt-2">
          <strong>Flight:</strong> {booking.flight.airline} —{" "}
          {booking.flight.flightNumber}
        </p>

        <p className="text-gray-700">
          <strong>Route:</strong> {booking.flight.source} →{" "}
          {booking.flight.destination}
        </p>

        <p className="text-gray-700 mt-2">
          <strong>Seats:</strong> {booking.seats.join(", ")}
        </p>

        <p className="text-gray-700">
          <strong>Total Paid:</strong>{" "}
          <span className="text-green-600 font-bold">₹ {booking.amountPaid}</span>
        </p>

        <p className="text-gray-700 mt-2">
          <strong>Payment Status:</strong>{" "}
          <span className="text-blue-600 font-bold">
            {booking.paymentStatus.toUpperCase()}
          </span>
        </p>
      </div>

      {/* Passenger Information */}
      <div className="bg-white shadow-md rounded-lg p-5 border border-gray-200 mt-6">
        <h3 className="text-xl font-semibold mb-3">Passenger Information</h3>

        {booking.passengers.map((p, i) => (
          <div key={i} className="border-b py-2">
            <p><strong>Name:</strong> {p.name}</p>
            <p><strong>Age:</strong> {p.age}</p>
            <p><strong>Gender:</strong> {p.gender}</p>
          </div>
        ))}
      </div>

      {/* Download Boarding Pass */}
      <button
        onClick={() => alert("PDF download coming in Step 7!")}
        className="w-full mt-6 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
      >
        Download Boarding Pass (PDF)
      </button>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Go Home
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          View My Bookings
        </button>
      </div>

    </div>
  );
}
