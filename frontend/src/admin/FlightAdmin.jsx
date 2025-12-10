import { useEffect, useState } from "react";
import api from "../api/axios";
import FlightForm from "./FlightForm";

export default function FlightsAdmin() {
  const [flights, setFlights] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [editFlight, setEditFlight] = useState(null);

  const loadFlights = async () => {
    const res = await api.get("/flights"); // admin route
    setFlights(res.data);
  };

  useEffect(() => {
    loadFlights();
  }, []);

  const deleteFlight = async (id) => {
    if (!confirm("Delete this flight?")) return;
    await api.delete(`/flights/${id}`);
    loadFlights();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold text-blue-700">Manage Flights</h1>
        <button
          onClick={() => { setEditFlight(null); setOpenForm(true); }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Flight
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {flights.map((f) => (
          <div key={f._id} className="bg-white p-4 shadow border rounded">
            <h2 className="font-bold text-lg">{f.airline} - {f.flightNumber}</h2>

            <p>{f.source} → {f.destination}</p>
            <p>Seats: {f.totalSeats}</p>
            <p>Price: ₹ {f.basePrice}</p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => { setEditFlight(f); setOpenForm(true); }}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteFlight(f._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {openForm && (
        <FlightForm
          flight={editFlight}
          onClose={() => { setOpenForm(false); loadFlights(); }}
        />
      )}
    </div>
  );
}
