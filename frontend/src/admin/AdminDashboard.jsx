import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-700">Admin Dashboard</h1>

      <div className="mt-6 space-y-4">
        <Link
          to="/admin/flights"
          className="block p-4 bg-white shadow rounded border hover:bg-gray-50"
        >
          ✈️ Manage Flights
        </Link>

        <Link
          to="/admin/bookings"
          className="block p-4 bg-white shadow rounded border hover:bg-gray-50"
        >
          📄 View All Bookings
        </Link>
      </div>
    </div>
  );
}
