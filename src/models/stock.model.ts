import { Schema, model } from 'mongoose';

const stockSchema = new Schema({
  clientId: { type: String, required: true, unique: true },
  productId: { type: String, required: true },
  organizationId: { type: String, required: true },
  shopId: String,
  quantity: { type: Number, default: 0 },
  unit: { type: String, required: true },
  unitPrice: { type: Number, default: 0 },
  isDeleted: Boolean,
  createdAt: { type: Date, required: true },
  updatedAt: Date
});

export const StockModel = model('Stock', stockSchema);
