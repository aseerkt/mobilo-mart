import { Schema, model, models } from 'mongoose';

export interface IUser {
  email: string;
  name: string;
  password: string;
}

const passwordField = {
  password: {
    type: String,
    required: true,
    select: false,
  },
};

const userFields = {
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
};

export const UserSchema = new Schema<IUser>({
  ...userFields,
  ...passwordField,
});

export const PublicUserSchema = new Schema<IUser>(userFields);

UserSchema.index({ email: 1 }, { unique: true });

export default models.User || model('User', UserSchema);
