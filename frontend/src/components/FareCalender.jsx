import { useEffect, useState } from "react";
import api from "../api/axios";

export default function FareCalendar({ source, destination, onSelectDate }) {
  const [calendar, setCalendar] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!source || !destination) return;

    const loadPrices = async () => {
      setLoading(true);

      const today = new Date();
      const dates = [];

      // next 14 days
      for (let i = 0; i < 14; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        dates.push(d.toISOString().split("T")[0]);
      }

      const priceData = [];

      for (const date of dates) {
        try {
          const res = await api.get(
            `/flights/search?source=${source}&destination=${destination}&date=${date}`
          );

          const flights = res.data || [];

          if (flights.length === 0) {
            priceData.push({ date, price: null });
          } else {
            const minPrice = Math.min(
              ...flights.map((f) => f.dynamicPrice || f.basePrice)
            );
            priceData.push({ date, price: minPrice });
          }
        } catch {
          priceData.push({ date, price: null });
        }
      }

      setCalendar(priceData);
      setLoading(false);
    };

    loadPrices();
  }, [source, destination]);

  if (loading) {
    return <p className="mt-4 text-gray-500">Loading fare calendar...</p>;
  }

  if (calendar.length === 0) return null;

  const prices = calendar.filter(c => c.price !== null).map(c => c.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  const getColor = (price) => {
    if (price === null) return "bg-gray-100 text-gray-400";
    if (price === min) return "bg-green-100 text-green-700";
    if (price === max) return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">
        💰 Fare Calendar (Next 14 Days)
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
        {calendar.map((c) => (
          <button
            key={c.date}
            disabled={!c.price}
            onClick={() => onSelectDate(c.date)}
            className={`p-3 rounded border text-center transition hover:shadow ${getColor(
              c.price
            )}`}
          >
            <p className="text-sm font-semibold">
              {new Date(c.date).toDateString().slice(0, 10)}
            </p>

            <p className="text-lg font-bold">
              {c.price ? `₹${c.price}` : "N/A"}
            </p>
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-sm mt-3">
        <span className="text-green-600">🟢 Cheapest</span>
        <span className="text-yellow-600">🟡 Normal</span>
        <span className="text-red-600">🔴 Expensive</span>
      </div>
    </div>
  );
}
