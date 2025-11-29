import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <Link to="/" className="font-bold text-xl">SkyRoute ✈️</Link>

      <div className="space-x-4">
        <Link to="/flights">Flights</Link>

        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="bg-white text-blue-600 px-3 py-1 rounded">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
