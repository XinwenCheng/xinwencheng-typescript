import { Schema, model } from 'mongoose';

const tokenSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
  expiredAt: { type: Date, required: true },
  isDeleted: Boolean,
  createdAt: { type: Date, required: true },
  updatedAt: Date
});

export const TokenModel = model('Token', tokenSchema);
