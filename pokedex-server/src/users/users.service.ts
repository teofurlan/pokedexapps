import Datastore from 'nedb-promises';

const db = Datastore.create({
  filename: 'src/database/users.db',
  autoload: true,
});

export type User = {
  id?: string;
  email: string;
  hash: string;
};

export class UsersService {
  async create(user: User) {
    return (await db.insert(user)) as User;
  }

  async findOne(email: string): Promise<User | null> {
    return (await db.findOne({ email })) as User;
  }
}
