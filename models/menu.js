import mongoose from "mongoose";
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  name: { type: String, required: true },
  day: { type: String, required: true },
  description: { type: String },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: { type: String, required: true },
    description: { type: String, required: true }
  }]
});
export default mongoose.model("Menu", menuSchema);
