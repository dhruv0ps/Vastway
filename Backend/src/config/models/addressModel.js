const mongoose = require("mongoose")
const addressSchema = new mongoose.Schema({
    unit: { type: String },
    buzz: { type: String },
    address: { type: String, required: true },
    longitude: { type: String, required: true },
    latitude: { type: String, required: true },
}, { id: false })

module.exports = addressSchema