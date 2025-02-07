const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, uppercase: true, trim: true },
    ID: { type: String, required: true, trim: true, unique: true },
    category: { type: mongoose.Types.ObjectId, ref: "Category", required: true },
    status: { type: String, enum: ['ACTIVE', 'DELETED'], default: 'ACTIVE', uppercase: true },
  },
  { timestamps: true }
);


subCategorySchema.index({ name: 1, category: 1 }, { unique: true });

subCategorySchema.pre(/^find/, function (next) {
  this.where({ status: { $ne: "DELETED" } });
  next();
});

module.exports = mongoose.model('SubCategory', subCategorySchema);
