import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FareCalendar from "../components/FareCalendar";
import BookingStepper from "../components/BookingStepper";

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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white">

      <div className="max-w-5xl mx-auto p-6">

        {/* BOOKING STEPPER */}
        <BookingStepper currentStep={0} />

        {/* HERO */}
        <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-400 mb-2">
          SkyRoute ✈️
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Find the best flights at the best prices
        </p>

        {/* SEARCH CARD */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 border dark:border-gray-700">

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

            <input
              type="text"
              placeholder="From"
              value={source}
              onChange={(e) => setSource(e.target.value.toUpperCase())}
              className="border dark:border-gray-600 bg-white dark:bg-gray-700 p-2 rounded"
            />

            <input
              type="text"
              placeholder="To"
              value={destination}
              onChange={(e) => setDestination(e.target.value.toUpperCase())}
              className="border dark:border-gray-600 bg-white dark:bg-gray-700 p-2 rounded"
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border dark:border-gray-600 bg-white dark:bg-gray-700 p-2 rounded"
            />

            <input
              type="number"
              min="1"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="border dark:border-gray-600 bg-white dark:bg-gray-700 p-2 rounded"
            />

            <select
              value={travelClass}
              onChange={(e) => setTravelClass(e.target.value)}
              className="border dark:border-gray-600 bg-white dark:bg-gray-700 p-2 rounded"
            >
              <option value="economy">Economy</option>
              <option value="business">Business</option>
            </select>

          </div>

          {/* SEARCH BUTTON */}
          <button
            onClick={searchFlights}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition"
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
    </div>
  );
}
