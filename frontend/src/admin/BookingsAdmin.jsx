import { useEffect, useState } from "react";
import api from "../api/axios";

export default function BookingsAdmin() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/bookings/admin/all");
      setBookings(res.data);
    };
    load();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">All Bookings</h1>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div key={b._id} className="bg-white p-4 rounded shadow border">

            <h2 className="font-bold">
              {b.flight.airline} — {b.flight.flightNumber}
            </h2>
            <p>User: {b.user.email}</p>
            <p>Seats: {b.seats.join(", ")}</p>
            <p>Amount: ₹ {b.amountPaid}</p>

            <p>Status: 
              <span className="font-semibold ml-1">
                {b.status.toUpperCase()}
              </span>
            </p>

          </div>
        ))}
      </div>
    </div>
  );
}
