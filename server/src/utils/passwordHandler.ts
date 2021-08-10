import { hash, compare, genSalt } from 'bcryptjs';

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt(12);
  return hash(password, salt);
}

export function verfiyPassword(
  hash: string,
  password: string
): Promise<boolean> {
  return compare(password, hash);
}
