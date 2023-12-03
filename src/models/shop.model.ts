const { v4: uuidV4 } = require('uuid');
import mongoose, { Schema, model } from 'mongoose';

const urlValidator = (url: string) => {
  return /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/.test(
    url
  );
};

const shopSchema = new Schema({
  /**
   * User's client ID who created this shop.
   */
  creatorId: String,
  /**
   * User's client ID who assigned this shop.
   */
  managerId: String,
  clientId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  location: Object,
  url: { type: String, validate: urlValidator },
  workingHours: Object,
  isOnline: Boolean,
  isDeactivated: Boolean,
  isDeleted: Boolean,
  createdAt: { type: Date, required: true },
  updatedAt: Date
});

export const ShopModel = model('Shop', shopSchema);
