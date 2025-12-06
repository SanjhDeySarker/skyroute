const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

exports.generateBoardingPass = (booking) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });

      // File Path
      const filePath = path.join(
        __dirname,
        `../../temp/boardingpass_${booking._id}.pdf`
      );
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Title
      doc.fontSize(22).text("SkyRoute Boarding Pass", { align: "center" });
      doc.moveDown();

      // Flight & Booking Details
      doc.fontSize(14).text(`Booking ID: ${booking._id}`);
      doc.text(`Airline: ${booking.flight.airline}`);
      doc.text(`Flight Number: ${booking.flight.flightNumber}`);
      doc.text(`Route: ${booking.flight.source} ➜ ${booking.flight.destination}`);
      doc.text(`Departure: ${new Date(booking.flight.departureTime).toLocaleString()}`);
      doc.text(`Seats: ${booking.seats.join(", ")}`);
      doc.moveDown();

      // Passenger Details
      doc.fontSize(16).text("Passengers", { underline: true });
      booking.passengers.forEach((p, index) => {
        doc.fontSize(14).text(
          `${index + 1}. ${p.name} | Age: ${p.age} | Gender: ${p.gender}`
        );
      });

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);
    } catch (err) {
      reject(err);
    }
  });
};
