import { Schema, model } from 'mongoose';

const marketActivitySchema = new Schema({
  clientId: { type: String, required: true },
  organizationId: { type: String, required: true },
  shopIds: { type: Array },
  productId: String,
  startDate: { type: Date, required: true },
  expiryDate: Date,
  name: { type: String, required: true },
  description: String,
  rule: { type: Object, required: true },
  isDeleted: Boolean,
  createdAt: { type: Date, required: true },
  updatedAt: Date
});

export const MarketActivityModel = model(
  'Market-Activity',
  marketActivitySchema
);
