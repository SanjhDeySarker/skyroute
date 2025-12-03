import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";

export default function Checkout() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state) {
    return <p className="p-6 text-red-600">No booking data found.</p>;
  }

  const { flight, selectedSeats } = state;

  const [passengers, setPassengers] = useState(
    selectedSeats.map(() => ({ name: "", age: "", gender: "" }))
  );

  const amount = selectedSeats.length * flight.basePrice;

  const handlePassengerChange = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const createBooking = async () => {
    try {
      const res = await api.post("/bookings", {
        flightId: flight._id,
        seats: selectedSeats,
        passengers,
        amountPaid: amount
      });

      const booking = res.data.booking;

      navigate("/payment", {
        state: { booking }
      });

    } catch (error) {
      alert("Error creating booking");
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">

      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      {/* Flight Details */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6">
        <h2 className="text-xl font-semibold">
          {flight.airline} — {flight.flightNumber}
        </h2>
        <p className="text-gray-600 mt-2">
          {flight.source} → {flight.destination}
        </p>
        <p className="text-gray-600">
          Seats Selected: <strong>{selectedSeats.join(", ")}</strong>
        </p>
        <p className="text-green-600 text-lg font-bold mt-2">
          Total Price: ₹ {amount}
        </p>
      </div>

      {/* Passenger Forms */}
      <h2 className="text-2xl font-semibold mb-2">Passenger Information</h2>

      {passengers.map((p, i) => (
        <div key={i} className="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 className="font-semibold mb-2">Passenger {i + 1}</h3>

          <input
            type="text"
            placeholder="Name"
            className="border p-2 w-full mb-2"
            value={p.name}
            onChange={(e) => handlePassengerChange(i, "name", e.target.value)}
          />

          <input
            type="number"
            placeholder="Age"
            className="border p-2 w-full mb-2"
            value={p.age}
            onChange={(e) => handlePassengerChange(i, "age", e.target.value)}
          />

          <select
            className="border p-2 w-full"
            value={p.gender}
            onChange={(e) =>
              handlePassengerChange(i, "gender", e.target.value)
            }
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      ))}

      {/* Continue to Payment Button */}
      <button
        onClick={createBooking}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg mt-4 w-full font-semibold hover:bg-blue-700"
      >
        Proceed to Payment
      </button>
    </div>
  );
}
