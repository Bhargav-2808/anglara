import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export function generateSalt(): Promise<string> {
  return bcrypt.genSalt(SALT_ROUNDS);
}
export function passwordHash(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export function passwordMatch(plainTextPassword: string, passwordHash: string): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, passwordHash);
}
