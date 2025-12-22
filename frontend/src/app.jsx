import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Flights from "./pages/Flights";
import FlightDetails from "./pages/FlightDetails";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Confirmation";
import Dashboard from "./pages/Dashboard";

// Multi-City
import MultiCityBuilder from "./components/MultiCityBuilder";

// Admin Pages
import AdminDashboard from "./admin/AdminDashboard";
import FlightsAdmin from "./admin/FlightsAdmin";
import BookingsAdmin from "./admin/BookingsAdmin";
import AdminAnalytics from "./admin/AdminAnalytics";

// Global Components
import Navbar from "./components/Navbar";
import ChatWidget from "./components/ChatWidget";

/**
 * ============================
 * PROTECTED ROUTES
 * ============================
 */

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user && user.role === "admin"
    ? children
    : <Navigate to="/" />;
};

/**
 * ============================
 * APP COMPONENT
 * ============================
 */

function App() {
  return (
    <Router>

      {/* NAVBAR */}
      <Navbar />

      {/* ROUTES */}
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* FLIGHTS */}
        <Route path="/flights" element={<Flights />} />
        <Route path="/flights/:id" element={<FlightDetails />} />

        {/* PROTECTED USER ROUTES */}
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />

        <Route
          path="/confirmation"
          element={
            <PrivateRoute>
              <Confirmation />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* MULTI-CITY */}
        <Route
          path="/multicity"
          element={
            <PrivateRoute>
              <MultiCityBuilder />
            </PrivateRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/flights"
          element={
            <AdminRoute>
              <FlightsAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <AdminRoute>
              <BookingsAdmin />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/analytics"
          element={
            <AdminRoute>
              <AdminAnalytics />
            </AdminRoute>
          }
        />

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

      {/* GLOBAL CHAT */}
      <ChatWidget />

    </Router>
  );
}

export default App;
