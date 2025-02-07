const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
    status: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: "Active",
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    currentRoute: {
        route: { type: mongoose.Schema.Types.ObjectId, ref: 'Route' },
        assignedAt: { type: Date }
    },
    lastLocation: {
        lat: { type: Number },
        lng: { type: Number }
    },
    trackingStatus: {
        type: String,
        enum: ['Online', 'Offline'],
        default: 'Offline'
    }
});

module.exports = mongoose.model('User', UserSchema);