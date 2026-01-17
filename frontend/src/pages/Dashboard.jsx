import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my");
        setBookings(res.data);
      } catch (err) {
        console.error("Failed to load bookings", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">
          Loading your trips...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white px-6 py-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6">
          Welcome, {user?.name} 👋
        </h1>

        {bookings.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You have no bookings yet.
            </p>
            <Button onClick={() => window.location.href = "/flights"}>
              Book a Flight
            </Button>
          </Card>
        ) : (
          <div className="grid gap-6">

            {bookings.map((booking) => (
              <Card
                key={booking._id}
                className="p-5 transition-all duration-300 hover:shadow-2xl"
              >
                {/* FLIGHT INFO */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                  <div>
                    <h2 className="text-xl font-bold">
                      {booking.flight?.airline}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {booking.flight?.source} → {booking.flight?.destination}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(
                        booking.flight?.departureTime
                      ).toLocaleString()}
                    </p>
                  </div>

                  {/* STATUS */}
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold
                      ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200"
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200"
                      }
                    `}
                  >
                    {booking.status}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="mt-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <p className="font-semibold">
                    Amount Paid:{" "}
                    <span className="text-green-600 dark:text-green-400">
                      ₹ {booking.amountPaid}
                    </span>
                  </p>

                  <div className="flex gap-3">
                    <a
                      href={`${import.meta.env.VITE_API_URL}/api/bookings/${booking._id}/boarding-pass`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="secondary">
                        Download Boarding Pass
                      </Button>
                    </a>
                  </div>
                </div>
              </Card>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}
