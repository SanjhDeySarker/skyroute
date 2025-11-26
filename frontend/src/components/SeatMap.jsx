import React, { useEffect, useState } from "react";
import useSocket from "../hooks/useSocket";
import axios from "axios";

export default function SeatMap({ flightId, userId, initialSeats }) {
  // initialSeats: [{ seatNumber: "1A", isBooked: false }, ... ]
  const socketRef = useSocket("/seats");
  const [seats, setSeats] = useState(initialSeats || []);
  const socket = socketRef.current;

  // seat statuses:
  // isBooked -> true (red)
  // isLocked -> true (yellow) (temp locked by someone)
  // available -> false

  useEffect(() => {
    if (!socket) return;

    socket.emit("joinFlight", { flightId });

    socket.on("seatLocked", ({ seat, userId: locker }) => {
      setSeats(prev => prev.map(s => s.seatNumber === seat ? { ...s, isLocked: true } : s));
    });

    socket.on("seatUnlocked", ({ seat }) => {
      setSeats(prev => prev.map(s => s.seatNumber === seat ? { ...s, isLocked: false } : s));
    });

    socket.on("seatBooked", ({ seats: bookedSeats }) => {
      setSeats(prev => prev.map(s => bookedSeats.includes(s.seatNumber) ? { ...s, isBooked: true, isLocked: false } : s));
    });

    socket.on("seatLockedFailed", ({ seat }) => {
      alert(`Seat ${seat} is already locked/booked`);
    });

    return () => {
      socket.off("seatLocked");
      socket.off("seatUnlocked");
      socket.off("seatBooked");
      socket.off("seatLockedFailed");
    };
  }, [socket, flightId]);

  // User selects seat: local optimistic update + emit lock
  const selectSeat = (seatNumber) => {
    // if seat booked or locked, ignore
    const s = seats.find(x => x.seatNumber === seatNumber);
    if (!s || s.isBooked || s.isLocked) return;

    // optimistically lock locally
    setSeats(prev => prev.map(x => x.seatNumber === seatNumber ? { ...x, isLocked: true, selectedByMe: true } : x));
    socket.emit("lockSeat", { flightId, seat: seatNumber, userId });
  };

  const unselectSeat = (seatNumber) => {
    setSeats(prev => prev.map(x => x.seatNumber === seatNumber ? { ...x, isLocked: false, selectedByMe: false } : x));
    socket.emit("unlockSeat", { flightId, seat: seatNumber });
  };

  // Confirm booking (call your booking API), then emit confirmBooking
  const confirmBooking = async (selectedSeats, bookingId) => {
    // call your bookings/payment API to finalize booking first...
    // on success:
    socket.emit("confirmBooking", { flightId, seats: selectedSeats, bookingId, userId });
  };

  return (
    <div className="seat-map">
      {seats.map(s => (
        <button
          key={s.seatNumber}
          onClick={() => s.selectedByMe ? unselectSeat(s.seatNumber) : selectSeat(s.seatNumber)}
          disabled={s.isBooked}
          style={{
            margin: 6,
            padding: 8,
            minWidth: 48,
            background: s.isBooked ? "#e74c3c" : s.isLocked ? "#f1c40f" : "#2ecc71",
            color: "#fff",
            border: s.selectedByMe ? "2px solid #000" : "none",
            cursor: s.isBooked ? "not-allowed" : "pointer"
          }}
        >
          {s.seatNumber}
        </button>
      ))}
      <div style={{ marginTop: 12 }}>
        <button onClick={() => { 
          const selected = seats.filter(s => s.selectedByMe).map(s => s.seatNumber);
          // call booking flow with selected
          console.log("Selected seats", selected);
        }}>
          Start Booking
        </button>
      </div>
    </div>
  );
}
