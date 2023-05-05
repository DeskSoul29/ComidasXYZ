import mongoose from "mongoose";
const Schema = mongoose.Schema;

const pedidoSchema = new Schema({
  productos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto'
  }],
  total: {
    type: Number,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en proceso', 'entregado'],
    default: 'pendiente'
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  usuario: {
    type: String,
    require: true,
  }
});
export default mongoose.model("Pedido", pedidoSchema);
