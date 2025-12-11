import { useState, useEffect } from "react";
import api from "../api/axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";

export default function AdminAnalytics() {
  const [bookingData, setBookingData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [popularRoutes, setPopularRoutes] = useState([]);

  useEffect(() => {
    const load = async () => {
      const b = await api.get("/admin/analytics/bookings");
      const r = await api.get("/admin/analytics/revenue");
      const p = await api.get("/admin/analytics/routes");

      setBookingData(b.data);
      setRevenueData(r.data);
      setPopularRoutes(p.data);
    };
    load();
  }, []);

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-blue-700">Analytics Dashboard</h1>

      {/* BOOKINGS GRAPH */}
      <div className="bg-white p-4 rounded shadow mt-6">
        <h2 className="text-xl font-semibold mb-3">Bookings Per Day</h2>

        <LineChart width={700} height={300} data={bookingData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="bookings" stroke="#3b82f6" />
        </LineChart>
      </div>

      {/* REVENUE GRAPH */}
      <div className="bg-white p-4 rounded shadow mt-6">
        <h2 className="text-xl font-semibold mb-3">Revenue Per Day</h2>

        <BarChart width={700} height={300} data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#10b981" />
        </BarChart>
      </div>

      {/* POPULAR ROUTES */}
      <div className="bg-white p-4 rounded shadow mt-6">
        <h2 className="text-xl font-semibold mb-3">Top Routes</h2>

        <ul className="list-disc pl-6">
          {popularRoutes.map((r) => (
            <li key={r._id.route} className="text-lg">
              {r._id.route} — {r.count} bookings
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
