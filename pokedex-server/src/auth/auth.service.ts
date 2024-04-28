import { ForbiddenException, Injectable } from '@nestjs/common';
import Datastore from 'nedb-promises';
import { AuthDto } from './dto';

const usersDB = Datastore.create({
  filename: 'src/database/users.db',
  autoload: true,
});

@Injectable()
export class AuthService {
  constructor() {}

  async signup(user: AuthDto) {
    try {
      const existingUser = await usersDB.findOne({ email: user.email });
      if (!existingUser) {
        usersDB.insert(user);
        return user;
      }
      throw new ForbiddenException('This email is already in use');
    } catch (error) {
      throw error;
    }
  }

  async signin(user: AuthDto) {
    try {
      const existingUser = await usersDB.findOne({ email: user.email });
      if (existingUser) {
        return user;
      }
      throw new ForbiddenException('Credentials incorrect');
    } catch (error) {
      throw error;
    }
  }
}
