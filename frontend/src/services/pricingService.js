exports.calculateDynamicPrice = (flight) => {
  let price = flight.basePrice;

  const total = flight.totalSeats;
  const booked = total - flight.availableSeats;
  const occupancy = booked / total;

  // 1. Increase price as seats fill (demand surge)
  if (occupancy > 0.8) price += price * 0.30;
  else if (occupancy > 0.6) price += price * 0.20;
  else if (occupancy > 0.4) price += price * 0.10;

  // 2. Weekend surge pricing (Fri-Sun)
  const day = new Date(flight.departureTime).getDay();
  if (day === 5 || day === 6 || day === 0) {
    price += price * 0.15;
  }

  // 3. Last-minute surge (< 24 hours)
  const now = Date.now();
  const departure = new Date(flight.departureTime).getTime();
  const hoursLeft = (departure - now) / (1000 * 60 * 60);

  if (hoursLeft < 24 && hoursLeft > 6) price += price * 0.20;
  if (hoursLeft <= 6) price += price * 0.40;

  return Math.round(price);
};
