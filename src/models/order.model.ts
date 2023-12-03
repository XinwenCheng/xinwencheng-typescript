import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  clientId: { type: String, required: true, unique: true },
  organizationId: { type: String, required: true },
  shopId: { type: String, required: true },
  userId: { type: String, required: true },
  products: { type: Array, required: true },
  price: { type: Object, required: true },
  couponId: String,
  isDeleted: Boolean,
  createdAt: { type: Date, required: true },
  updatedAt: Date
});

export const OrderModel = model('Order', orderSchema);
