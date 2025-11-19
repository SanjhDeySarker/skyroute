const Flight = require("../models/Flight");

// Add new flight (ADMIN)
exports.addFlight = async (req, res) => {
  try {
    const flight = await Flight.create(req.body);

    res.json({
      message: "Flight added successfully",
      flight
    });
  } catch (error) {
    res.status(500).json({ message: "Error adding flight", error });
  }
};

// Get all flights
exports.getAllFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flights", error });
  }
};

// Search flights (source, destination, date)
exports.searchFlights = async (req, res) => {
  const { source, destination, date } = req.query;

  try {
    const startDate = new Date(date);
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59);

    const flights = await Flight.find({
      source,
      destination,
      departureTime: { $gte: startDate, $lte: endDate }
    });

    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: "Error searching flights", error });
  }
};

// Get flight details
exports.getFlightById = async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    res.json(flight);
  } catch (error) {
    res.status(500).json({ message: "Error fetching flight details", error });
  }
};

// Update flight (ADMIN)
exports.updateFlight = async (req, res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Flight updated", flight });
  } catch (error) {
    res.status(500).json({ message: "Error updating flight", error });
  }
};

// Delete flight (ADMIN)
exports.deleteFlight = async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.json({ message: "Flight deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting flight", error });
  }
};
