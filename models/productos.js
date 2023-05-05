import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String },
  cost: { type: Number, required: true },
  iva: { type: Number, required: true },
  prep_time: { type: Number, required: true }
});
export default mongoose.model("Product", productSchema);
