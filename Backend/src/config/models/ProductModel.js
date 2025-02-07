const mongoose = require("mongoose");
const childSchema = require("./childModel");
const { Schema } = mongoose;


const SupplierSchema = new Schema({
  supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Suppliers' },
  name: { type: String },
}, { _id: false });

// Define ProductSchema
const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    ID: { type: String, required: true, trim: true, unique: true },
    children: [childSchema],
    supplier: { type: SupplierSchema, required: false },
  },
  {
    timestamps: true
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
