import { Link } from "react-router-dom";
import Card from "../components/ui/Card";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-2">
          Admin Dashboard 🛠️
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Manage flights, bookings, and analytics
        </p>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* FLIGHTS */}
          <Link to="/admin/flights">
            <Card className="p-6 card-hover cursor-pointer">
              <h2 className="text-xl font-bold mb-2">
                ✈️ Flights
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Add, edit, or delete flights
              </p>
            </Card>
          </Link>

          {/* BOOKINGS */}
          <Link to="/admin/bookings">
            <Card className="p-6 card-hover cursor-pointer">
              <h2 className="text-xl font-bold mb-2">
                📋 Bookings
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                View and manage user bookings
              </p>
            </Card>
          </Link>

          {/* ANALYTICS */}
          <Link to="/admin/analytics">
            <Card className="p-6 card-hover cursor-pointer">
              <h2 className="text-xl font-bold mb-2">
                📊 Analytics
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Revenue and booking insights
              </p>
            </Card>
          </Link>

        </div>
      </div>
    </div>
  );
}
