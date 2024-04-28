import Datastore from 'nedb-promises';

const db = Datastore.create({
  filename: 'src/database/users.db',
  autoload: true,
});

export type User = {
  _id?: string;
  email: string;
  hash: string;
};

export class UsersService {
  async create(user: User) {
    await db.insert(user);
  }

  async findOne(email: string): Promise<User | null> {
    return (await db.findOne({ email })) as User;
  }
}
