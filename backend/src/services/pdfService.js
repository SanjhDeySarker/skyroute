const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generateBoardingPass = (booking) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40 });
      const filePath = path.join(
        __dirname,
        `../../temp/BoardingPass_${booking._id}.pdf`
      );

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // ======================
      // HEADER
      // ======================
      doc
        .fontSize(22)
        .text("✈️ SkyRoute Boarding Pass", { align: "center" })
        .moveDown();

      doc
        .fontSize(12)
        .text(`Booking ID: ${booking._id}`)
        .text(`Booking Date: ${new Date(booking.createdAt).toLocaleString()}`)
        .moveDown();

      // ======================
      // SINGLE FLIGHT BOOKING
      // ======================
      if (booking.flight) {
        addFlightSection(doc, booking.flight, booking.seats, booking.passengers);
      }

      // ======================
      // MULTI-CITY BOOKING
      // ======================
      if (booking.legs && booking.legs.length > 0) {
        booking.legs.forEach((leg, index) => {
          doc.addPage();
          doc
            .fontSize(18)
            .text(`Flight Leg ${index + 1}`, { underline: true })
            .moveDown();

          addFlightSection(
            doc,
            leg.flight,
            leg.seats,
            leg.passengers
          );
        });
      }

      // ======================
      // FOOTER
      // ======================
      doc
        .addPage()
        .fontSize(14)
        .text("Thank you for choosing SkyRoute ✈️", { align: "center" })
        .moveDown()
        .fontSize(12)
        .text("Please arrive at the airport at least 2 hours before departure.", {
          align: "center"
        });

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);

    } catch (err) {
      reject(err);
    }
  });
};

// ======================
// HELPER FUNCTION
// ======================
function addFlightSection(doc, flight, seats, passengers) {
  doc
    .fontSize(16)
    .text(`${flight.airline} — ${flight.flightNumber}`)
    .moveDown(0.5);

  doc
    .fontSize(12)
    .text(`Route: ${flight.source} → ${flight.destination}`)
    .text(`Departure: ${new Date(flight.departureTime).toLocaleString()}`)
    .text(`Seats: ${seats.join(", ")}`)
    .moveDown();

  doc
    .fontSize(14)
    .text("Passengers:", { underline: true })
    .moveDown(0.3);

  passengers.forEach((p, i) => {
    doc.fontSize(12).text(
      `${i + 1}. ${p.name} | Age: ${p.age} | Gender: ${p.gender}`
    );
  });
}
