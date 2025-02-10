const mongoose = require("mongoose")

const LeadSchema = new mongoose.Schema({
  categories: [{
    type: mongoose.Types.ObjectId,
    ref: "LeadCategory",
    required: true
  }],
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  emailId: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  images: [{
    type: String 
  }],
  notes: {
    type: String 
  }
}, { timestamps: true });

const LeadCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true });

const Lead = mongoose.model("Lead", LeadSchema);
const LeadCategory = mongoose.model("LeadCategory", LeadCategorySchema);

module.exports = { Lead, LeadCategory };