import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  clientId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  phone: { type: String, unique: true },
  encryptedPassword: String,
  salt: { type: String, required: true },
  role: { type: String, required: true },
  shopId: String,
  organizationId: { type: String, required: true },
  isActivated: Boolean,
  isDeleted: Boolean,
  createdAt: { type: Date, required: true },
  updatedAt: Date
});

export const UserModel = model('User', userSchema);
