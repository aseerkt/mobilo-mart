import { Schema, model, models } from 'mongoose';

export interface IUser {
  email: string;
  name: string;
  password: string;
}

export const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
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
});

export default models.User || model('User', UserSchema);
