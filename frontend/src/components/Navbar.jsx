import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import useDarkMode from "../hooks/useDarkMode";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dark, setDark] = useDarkMode();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 text-black dark:text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LEFT: LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600 dark:text-blue-400"
        >
          SkyRoute ✈️
        </Link>

        {/* RIGHT: NAV LINKS */}
        <div className="flex items-center gap-4">

          <Link
            to="/"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Home
          </Link>

          <Link
            to="/flights"
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            Flights
          </Link>

          {/* MULTI-CITY */}
          {user && (
            <Link
              to="/multicity"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Multi-City
            </Link>
          )}

          {/* USER DASHBOARD */}
          {user && (
            <Link
              to="/dashboard"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              My Trips
            </Link>
          )}

          {/* ADMIN LINKS */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="text-red-600 dark:text-red-400 font-semibold"
            >
              Admin
            </Link>
          )}

          {/* AUTH BUTTONS */}
          {!user ? (
            <>
              <Link
                to="/login"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          )}

          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => setDark(!dark)}
            className="ml-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
            title="Toggle Dark Mode"
          >
            {dark ? "🌙" : "🌞"}
          </button>

        </div>
      </div>
    </nav>
  );
}
