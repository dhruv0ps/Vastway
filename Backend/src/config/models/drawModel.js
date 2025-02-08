const mongoose = require("mongoose");

const drawSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
   category: { type: mongoose.Types.ObjectId, ref: "categories", required: true },
  subCategories: [{ type: mongoose.Types.ObjectId, ref: "SubCategory" }],
  publishedBy: { type: String, default: "Vastway Immigration" },
  invitationsIssued: { type: Number, required: true },
  drawDate: { type: Date, required: true },
  crsCutoff: { type: String, default: null },
  score: { type: Number, default: null },
  rankRequired: { type: String, required: true },
  tieBreakingRule: { type: String, required: true },
  additionalInfo: { type: String, default: "" },
  image: { type: String, default: "" }, 
  imageUrl:{type:String},
  imageCaption: { type: String, default: "" },
  previousDraw: { type: mongoose.Types.ObjectId, ref: "Draw", default: null },
  nocCodes:[{type:mongoose.Types.ObjectId,ref:"NocCode"}]
  },
  { timestamps: true }
);

module.exports  = mongoose.model("Draw", drawSchema);

