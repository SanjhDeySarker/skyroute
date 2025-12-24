import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FareCalendar from "../components/FareCalendar";

export default function Home() {
  const navigate = useNavigate();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState("economy");

  const searchFlights = () => {
    if (!source || !destination || !date) {
      alert("Please fill all required fields");
      return;
    }

    navigate(
      `/flights?source=${source}&destination=${destination}&date=${date}&passengers=${passengers}&class=${travelClass}`
    );
  };

  return (
    <div className="max-w-5xl mx-auto p-6">

      {/* HERO */}
      <h1 className="text-4xl font-bold text-blue-700 mb-2">
        SkyRoute ✈️
      </h1>
      <p className="text-gray-600 mb-6">
        Find the best flights at the best prices
      </p>

      {/* SEARCH BOX */}
      <div className="bg-white shadow-lg rounded-lg p-6 border">

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          <input
            type="text"
            placeholder="From"
            value={source}
            onChange={(e) => setSource(e.target.value.toUpperCase())}
            className="border p-2 rounded"
          />

          <input
            type="text"
            placeholder="To"
            value={destination}
            onChange={(e) => setDestination(e.target.value.toUpperCase())}
            className="border p-2 rounded"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded"
          />

          <input
            type="number"
            min="1"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            className="border p-2 rounded"
          />

          <select
            value={travelClass}
            onChange={(e) => setTravelClass(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="economy">Economy</option>
            <option value="business">Business</option>
          </select>

        </div>

        <button
          onClick={searchFlights}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Search Flights
        </button>

        {/* FARE CALENDAR */}
        <FareCalendar
          source={source}
          destination={destination}
          onSelectDate={(selectedDate) => setDate(selectedDate)}
        />

      </div>

    </div>
  );
}
