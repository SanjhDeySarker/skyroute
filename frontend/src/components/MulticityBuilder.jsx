import { useState } from "react";
import api from "../api/axios";

export default function MultiCityBuilder() {
  const [legs, setLegs] = useState([
    { source: "", destination: "", date: "" },
    { source: "", destination: "", date: "" }
  ]);

  const addLeg = () =>
    setLegs([...legs, { source: "", destination: "", date: "" }]);

  const searchFlights = async () => {
    // For demo: navigate to flight selection per leg
    console.log("Search flights for legs:", legs);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Multi-City Trip ✈️</h1>

      {legs.map((leg, i) => (
        <div key={i} className="bg-white p-4 mb-3 rounded shadow">
          <h3 className="font-semibold mb-2">Leg {i + 1}</h3>

          <input
            className="border p-2 w-full mb-2"
            placeholder="Source"
            onChange={(e) => leg.source = e.target.value}
          />
          <input
            className="border p-2 w-full mb-2"
            placeholder="Destination"
            onChange={(e) => leg.destination = e.target.value}
          />
          <input
            type="date"
            className="border p-2 w-full"
            onChange={(e) => leg.date = e.target.value}
          />
        </div>
      ))}

      <button
        onClick={addLeg}
        className="bg-gray-600 text-white px-4 py-2 rounded"
      >
        + Add City
      </button>

      <button
        onClick={searchFlights}
        className="bg-blue-600 text-white px-6 py-2 rounded ml-3"
      >
        Search Flights
      </button>
    </div>
  );
}
