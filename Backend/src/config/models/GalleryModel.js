const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
    url: { type: String, required: true },
    title: { type: String, default: "" },
    caption: { type: String, default: "" },
    altText: { type: String, default: "" },
    size: { type: Number, default: 0 },
    dimensions: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
  });
  
  
module.exports = mongoose.model("Image", ImageSchema);
  
 