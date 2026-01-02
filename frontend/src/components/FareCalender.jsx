import { useEffect, useState } from "react";
import api from "../api/axios";

export default function FareCalendar({ source, destination, onSelectDate }) {
  const [calendarData, setCalendarData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!source || !destination) return;

    const fetchFareCalendar = async () => {
      setLoading(true);

      const today = new Date();
      const daysToShow = 14;
      const results = [];

      for (let i = 0; i < daysToShow; i++) {
        const dateObj = new Date(today);
        dateObj.setDate(today.getDate() + i);

        const date = dateObj.toISOString().split("T")[0];

        try {
          const res = await api.get(
            `/flights/search?source=${source}&destination=${destination}&date=${date}`
          );

          const flights = res.data || [];

          if (flights.length === 0) {
            results.push({ date, price: null });
          } else {
            const minPrice = Math.min(
              ...flights.map((f) => f.dynamicPrice || f.basePrice)
            );
            results.push({ date, price: minPrice });
          }
        } catch (err) {
          results.push({ date, price: null });
        }
      }

      setCalendarData(results);
      setLoading(false);
    };

    fetchFareCalendar();
  }, [source, destination]);

  if (loading) {
    return (
      <p className="mt-4 text-gray-500 dark:text-gray-400">
        Loading fare calendar...
      </p>
    );
  }

  if (calendarData.length === 0) return null;

  const prices = calendarData
    .filter((d) => d.price !== null)
    .map((d) => d.price);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const getColorClass = (price) => {
    if (price === null)
      return "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed";

    if (price === minPrice)
      return "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-200";

    if (price === maxPrice)
      return "bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200";

    return "bg-yellow-100 dark:bg-yellow-700 text-yellow-700 dark:text-yellow-200";
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">
        💰 Fare Calendar (Next 14 Days)
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {calendarData.map((item) => (
          <button
            key={item.date}
            disabled={!item.price}
            onClick={() => onSelectDate(item.date)}
            className={`p-3 rounded-lg border text-center transition hover:shadow ${getColorClass(
              item.price
            )}`}
          >
            <p className="text-sm font-semibold">
              {new Date(item.date).toDateString().slice(0, 10)}
            </p>

            <p className="text-lg font-bold">
              {item.price ? `₹${item.price}` : "N/A"}
            </p>
          </button>
        ))}
      </div>

      {/* LEGEND */}
      <div className="flex flex-wrap gap-4 text-sm mt-4">
        <span className="text-green-600 dark:text-green-400">
          🟢 Cheapest
        </span>
        <span className="text-yellow-600 dark:text-yellow-300">
          🟡 Normal
        </span>
        <span className="text-red-600 dark:text-red-400">
          🔴 Expensive
        </span>
        <span className="text-gray-500">
          ⚪ No flights
        </span>
      </div>
    </div>
  );
}
