const mongoose = require("mongoose")

const nocCodeSchema = new mongoose.Schema({
  tier: {
    type: String,
    required: true
  },
  nocCode: {
    type: String,
    required: true,
    unique: true
  },
  classTitle: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports= mongoose.model("NocCode", nocCodeSchema);
