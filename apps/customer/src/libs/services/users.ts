import { User, UserCreatePayload } from '@/types/user';
import { serverApi } from '../fetcher';

export const registerUser = (payload: UserCreatePayload) => {
  return serverApi.post(payload, '/api/users').json<User>();
};
