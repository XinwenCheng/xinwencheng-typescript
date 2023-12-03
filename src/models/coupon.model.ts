import { Schema, model } from 'mongoose';

const couponSchema = new Schema({
  clientId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  organizationId: { type: String, required: true },
  shopIds: Array,
  marketActivityId: { type: String, required: true },
  userId: { type: String, required: true },
  startDate: Date,
  expiryDate: Date,
  usedAt: Date,
  isMandatoryExpired: Boolean,
  isDeleted: Boolean,
  createdAt: { type: Date, required: true },
  updatedAt: Date
});

export const CouponModel = model('Coupon', couponSchema);
