import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

export default function Payment() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state || !state.booking) {
    return <p className="p-6 text-red-600">No booking found for payment.</p>;
  }

  const { booking } = state;

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    try {
      setProcessing(true);
      setError("");

      const res = await api.post(`/payments/${booking._id}`);

      const updatedBooking = res.data.booking;

      // Redirect to confirmation page
      navigate("/confirmation", {
        state: { booking: updatedBooking }
      });
    } catch (err) {
      setError("Payment failed. Please try again.");
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">

      <h1 className="text-3xl font-bold text-blue-700 mb-6">Payment</h1>

      {/* Booking Summary */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 mb-6">
        <h2 className="text-xl font-semibold">Booking Summary</h2>

        <p className="text-gray-600 mt-2">
          Flight: <strong>{booking.flight.airline}</strong>
        </p>
        <p className="text-gray-600">
          Flight No: <strong>{booking.flight.flightNumber}</strong>
        </p>

        <p className="text-gray-600 mt-2">
          Seats: <strong>{booking.seats.join(", ")}</strong>
        </p>

        <p className="text-green-600 text-xl font-bold mt-4">
          Amount: ₹ {booking.amountPaid}
        </p>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={processing}
        className={`w-full py-3 text-white text-lg font-semibold rounded-lg transition ${
          processing ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {processing ? "Processing Payment..." : "Pay Now"}
      </button>
    </div>
  );
}
