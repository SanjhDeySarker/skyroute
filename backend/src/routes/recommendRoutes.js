const express = require("express");
const router = express.Router();
const { recommendFlights } = require("../services/recommendationService");
const protect = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {
  const { source, destination, date } = req.query;
  const userId = req.user?._id;
  const recs = await recommendFlights({ userId, source, destination, date });
  res.json(recs);
});

module.exports = router;
