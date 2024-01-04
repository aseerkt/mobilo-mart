import { Schema, Types } from 'mongoose';

export interface IAddress {
  userId: Types.ObjectId;
  fullName: string;
  mobileNumber: string;
  emailAddress: string;
  streetAddress: string;
  city: string;
  state: string;
}

export const AddressSchema = new Schema<IAddress>({});
