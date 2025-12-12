const Booking = require("../models/Booking");
const Flight = require("../models/Flight");
const Search = require("../models/Search");

// Returns top N recommended flights for (user, context)
async function recommendFlights({ userId, source, destination, date, limit = 5 }) {
  // 1) If user has previous bookings, recommend similar destinations/airlines
  let userFavs = [];
  if (userId) {
    const bookings = await Booking.find({ user: userId }).populate("flight");
    const counts = {};
    bookings.forEach(b => {
      const key = `${b.flight.source}-${b.flight.destination}`;
      counts[key] = (counts[key] || 0) + 1;
    });
    userFavs = Object.keys(counts).sort((a,b)=>counts[b]-counts[a]).slice(0,3);
  }

  // 2) Popular flights for this route (other users): bookings count
  const popular = await Booking.aggregate([
    { $lookup: { from: "flights", localField: "flight", foreignField: "_id", as: "flightInfo" } },
    { $unwind: "$flightInfo" },
    { $match: { "flightInfo.source": source, "flightInfo.destination": destination } },
    { $group: { _id: "$flightInfo._id", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

  const popularIds = popular.map(p => p._id);

  // 3) Candidate flights: same route OR routes similar to userFavs
  let candidates = await Flight.find({
    $or: [
      { _id: { $in: popularIds } },
      { source, destination },
      // optional expand: same airline as user favorites
      // { airline: { $in: userFavAirlines } }
    ]
  }).limit(50);

  // 4) Scoring: base score + popularity + recency + price preference (cheap filter)
  const scored = candidates.map(f => {
    const score = 0
      + (f.basePrice ? 0 : 0) // placeholder
    return { flight: f, score: 0 };
  });

  // Simple ranking: prioritize same-route popular -> then earliest departure -> then lower price
  scored.sort((a,b) => {
    if (a.flight.source === source && a.flight.destination === destination &&
        b.flight.source !== source) return -1;
    // earlier departure
    if (new Date(a.flight.departureTime) < new Date(b.flight.departureTime)) return -1;
    return a.flight.basePrice - b.flight.basePrice;
  });

  return scored.slice(0, limit).map(s => s.flight);
}

module.exports = { recommendFlights };
