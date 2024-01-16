export interface User {
  _id: string;
  email: string;
  name: string;
}

export interface UserCreatePayload {
  name: string;
  email: string;
  password: string;
}
