import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  organizationId: { type: String, required: true },
  category: String,
  isDeactivated: Boolean,
  isDeleted: Boolean,
  createdAt: { type: Date, required: true },
  updatedAt: Date
});

export const ProductModel = model('Product', productSchema);
