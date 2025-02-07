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
  documents: [{
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

module.exports = mongoose.model("Lead", LeadSchema);
module.exports = mongoose.model("LeadCategory", LeadCategorySchema);
