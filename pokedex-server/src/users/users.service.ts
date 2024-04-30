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
    const newUser = await db.insert(user);
    delete newUser.hash;
    delete newUser._id;
    return newUser;
  }

  async findOne(email: string): Promise<User | null> {
    return (await db.findOne({ email })) as User;
  }
}
