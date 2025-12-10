import { useState } from "react";
import api from "../api/axios";

export default function FlightForm({ flight, onClose }) {
  const [form, setForm] = useState(
    flight || {
      airline: "",
      flightNumber: "",
      source: "",
      destination: "",
      departureTime: "",
      arrivalTime: "",
      totalSeats: 180,
      basePrice: 5000
    }
  );

  const saveFlight = async () => {
    if (flight) {
      await api.put(`/flights/${flight._id}`, form);
    } else {
      await api.post("/flights", form);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 w-full max-w-lg rounded shadow-lg">

        <h1 className="text-xl font-bold mb-4">
          {flight ? "Edit Flight" : "Add New Flight"}
        </h1>

        <div className="space-y-3">
          <input className="w-full p-2 border" placeholder="Airline"
            value={form.airline}
            onChange={(e) => setForm({ ...form, airline: e.target.value })}
          />

          <input className="w-full p-2 border" placeholder="Flight Number"
            value={form.flightNumber}
            onChange={(e) => setForm({ ...form, flightNumber: e.target.value })}
          />

          <input className="w-full p-2 border" placeholder="Source"
            value={form.source}
            onChange={(e) => setForm({ ...form, source: e.target.value })}
          />

          <input className="w-full p-2 border" placeholder="Destination"
            value={form.destination}
            onChange={(e) => setForm({ ...form, destination: e.target.value })}
          />

          <label>Departure Time</label>
          <input type="datetime-local" className="w-full p-2 border"
            value={form.departureTime}
            onChange={(e) => setForm({ ...form, departureTime: e.target.value })}
          />

          <label>Arrival Time</label>
          <input type="datetime-local" className="w-full p-2 border"
            value={form.arrivalTime}
            onChange={(e) => setForm({ ...form, arrivalTime: e.target.value })}
          />

          <input className="w-full p-2 border" type="number" placeholder="Total Seats"
            value={form.totalSeats}
            onChange={(e) => setForm({ ...form, totalSeats: e.target.value })}
          />

          <input className="w-full p-2 border" type="number" placeholder="Base Price"
            value={form.basePrice}
            onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            Cancel
          </button>
          <button onClick={saveFlight} className="px-4 py-2 bg-blue-600 text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
