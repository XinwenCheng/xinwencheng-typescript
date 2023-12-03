import { Schema, model } from 'mongoose';

const subscriptionSchema = new Schema({
  subscriberId: { type: String, required: true },
  type: { type: String, required: true },
  startDate: { type: Date, required: true },
  expiryDate: Date,
  paymentId: { type: String, required: true },
  isDeleted: Boolean,
  createdAt: { type: Date, required: true },
  updatedAt: Date
});

export const SubscriptionModel = model('Subscription', subscriptionSchema);
