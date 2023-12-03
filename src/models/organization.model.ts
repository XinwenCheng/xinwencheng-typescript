import { Schema, model } from 'mongoose';

const organizationSchema = new Schema({
  clientId: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  unifiedSocialCreditCode: { type: String, required: true, unique: true },
  isActivated: Boolean,
  isDeleted: Boolean,
  createdAt: { type: Date, required: true },
  updatedAt: Date
});

export const OrganizationModel = model('Organization', organizationSchema);
