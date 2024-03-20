import bcrypt from 'bcrypt';
import { IUser } from '../models/User';

export default [
  {
    email: 'guest@gmail.com',
    name: 'Guest 101',
    password: bcrypt.hashSync('Guest@123', 10),
  },
] as IUser[];
