import type { User } from "../db/users";
import * as usersDB from "../db/users";
import { getSalt, hashPassword } from "../helpers/hashPassword";

export async function createUser(user: { email: string, password: string }) {
  if (!user.email || user.email.length < 5 || !user.email.includes('@')) {
    throw new Error('Invalid email');
  }
  const existing = await usersDB.findByEmail(user.email);
  if (existing) {
    throw new Error('User already exists');
  }
  if (!user.password || user.password.length < 8) {
    throw new Error('Password too short');
  }

  const salt = getSalt();
  const userWithHash: User = {
    email: user.email,
    hash: hashPassword(salt + user.password),
    salt
  };

  return usersDB.createUser(userWithHash);
}

export async function authenticateUser(user: { email: string, password: string }) {
  const existing = await usersDB.findByEmail(user.email);
  if (!existing) {
    throw new Error('User not found');
  }
  const hash = hashPassword(existing.salt + user.password);
  if (hash !== existing.hash) {
    throw new Error('Invalid password');
  }
  return { email: existing.email };
}