import { Schema, model, models } from 'mongoose';

export interface IUser {
  email: string;
  name: string;
  password: string;
}

const schemaStruct = {
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
};

export const UserSchema = new Schema<IUser>(schemaStruct);

export const PublicUserSchema = new Schema<IUser>(schemaStruct);

UserSchema.index({ email: 1 }, { unique: true });

export default models.User || model('User', UserSchema);
