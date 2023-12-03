import { Schema, model } from 'mongoose';

const paymentSchema = new Schema({
  orderId: { type: String, required: true },
  userId: { type: String, required: true },
  couponId: String,
  totalPrice: { type: Number, default: 0 },
  finalPrice: { type: Number, default: 0 },
  receiptId: String,
  status: { type: String, required: true, default: 'pending' },
  isDeleted: Boolean,
  createdAt: { type: Date, required: true },
  updatedAt: Date
});

export const PaymentModel = model('Payment', paymentSchema);
