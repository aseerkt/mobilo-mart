import { Schema, Types } from 'mongoose';

export interface IAddress {
  userId: typeof Types.ObjectId;
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  streetAddress: string;
  city: string;
  state: string;
}

export const AddressSchema = new Schema<IAddress>({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});
