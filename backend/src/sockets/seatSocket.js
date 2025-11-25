const { Server } = require("socket.io");
const SeatLockService = require("../services/seatLockService");

module.exports = function initSeatSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" }
  });

  // We'll use a namespace for seats
  const nsp = io.of("/seats");

  // Initialize lock service (in-memory by default; can pass redis client)
  const lockService = new SeatLockService();

  // Lock timeout ms (2 minutes)
  const LOCK_TIMEOUT = 2 * 60 * 1000;

  nsp.on("connection", (socket) => {
    // client should join flight room after connecting: socket.emit('joinFlight', { flightId })
    socket.on("joinFlight", ({ flightId }) => {
      if (!flightId) return;
      socket.join(flightId);
    });

    // Request to lock a seat
    socket.on("lockSeat", async ({ flightId, seat, userId }) => {
      if (!flightId || !seat) return;
      const success = await lockService.lockSeat(flightId, seat, socket.id, userId, LOCK_TIMEOUT);
      if (!success) {
        socket.emit("seatLockedFailed", { seat });
        return;
      }
      // Broadcast to others in the flight room that seat is temporarily locked
      nsp.to(flightId).emit("seatLocked", { seat, userId });
    });

    // Unlock seat explicitly (user unselects)
    socket.on("unlockSeat", async ({ flightId, seat }) => {
      if (!flightId || !seat) return;
      await lockService.unlockSeat(flightId, seat, socket.id);
      nsp.to(flightId).emit("seatUnlocked", { seat });
    });

    // Confirm booking (payment complete) for seats
    socket.on("confirmBooking", async ({ flightId, seats, bookingId, userId }) => {
      if (!flightId || !Array.isArray(seats)) return;
      // remove locks and broadcast booked
      for (const seat of seats) {
        await lockService.removeLock(flightId, seat);
      }
      nsp.to(flightId).emit("seatBooked", { seats, bookingId, userId });
    });

    // Handle disconnect: release locks held by this socket
    socket.on("disconnect", async () => {
      const released = await lockService.releaseLocksBySocket(socket.id);
      // released is array of { flightId, seat }
      released.forEach(({ flightId, seat }) => {
        nsp.to(flightId).emit("seatUnlocked", { seat });
      });
    });
  });

  // Optional: periodic cleanup — already handled inside seatLockService if implemented
  console.log("Seat socket initialized");
};
