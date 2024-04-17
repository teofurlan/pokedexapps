import Datastore from 'nedb-promises';

const db = Datastore.create({ filename: './users.db' });

export type User = {
  email: string;
  hash: string;
  salt: string;
};

export const createUser = async (user: User) => {
  return db.insert(user);
};

export const findByEmail = async (email: string) => {
  return db.findOne<User>({ email });
}