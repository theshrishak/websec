const mongoose = require("mongoose");
const { logger } = require('../utils/logger');

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, refPath: "serviceType", required: true },
  serviceType: { type: String, enum: ["Makeup", "Nail"], required: true },
  appointmentPlace: { type: String, enum: ["Home Service", "Studio"], default: "Studio" },
  bookingDate: { type: String, required: true },
  bookingTime: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
});

BookingSchema.post('save', function(res) {
  logger.info({
    type: 'mongoose',
    operation: 'SAVE',
    model: 'BOOKING',
    result: res,
    timestamp: new Date().toISOString()
  });
});

BookingSchema.post('findOneAndUpdate', function(res) {
  logger.info({
    type: 'mongoose',
    operation: 'UPDATE',
    model: 'Booking',
    result: res,
    timestamp: new Date().toISOString()
  });
});

module.exports = mongoose.model("Booking", BookingSchema);
