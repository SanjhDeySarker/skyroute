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
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-extrabold text-blue-600 dark:text-blue-400"
        >
          SkyRoute ✈️
        </Link>

        {/* NAV LINKS */}
        <div className="flex items-center gap-4 text-sm font-medium">

          <Link to="/">Home</Link>

          <Link to="/flights">Flights</Link>

          {user && (
            <Link to="/dashboard">My Trips</Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="text-red-600 dark:text-red-400 font-semibold"
            >
              Admin
            </Link>
          )}

          {/* AUTH */}
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
            >
              Logout
            </button>
          )}

          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => setDark(!dark)}
            className="ml-2 w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center"
            title="Toggle Dark Mode"
          >
            {dark ? "🌙" : "🌞"}
          </button>

        </div>
      </div>
    </nav>
  );
}
