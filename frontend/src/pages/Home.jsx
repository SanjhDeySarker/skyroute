import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  const [form, setForm] = useState({ source: "", destination: "", date: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    nav(`/flights?source=${form.source}&destination=${form.destination}&date=${form.date}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">Find Your Next Flight ✈️</h1>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <input className="border p-2 w-full" placeholder="Source" onChange={e => setForm({...form, source: e.target.value})}/>
        <input className="border p-2 w-full" placeholder="Destination" onChange={e => setForm({...form, destination: e.target.value})}/>
        <input className="border p-2 w-full" type="date" onChange={e => setForm({...form, date: e.target.value})}/>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Search Flights</button>
      </form>
    </div>
  );
}
