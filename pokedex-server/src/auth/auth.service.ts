import { ForbiddenException, Injectable } from '@nestjs/common';
import Datastore from 'nedb-promises';
import { AuthDto } from './dto';
import * as argon from 'argon2';

const usersDB = Datastore.create({
  filename: 'src/database/users.db',
  autoload: true,
});

@Injectable()
export class AuthService {
  constructor() {}

  async signup(dto: AuthDto) {
    try {
      // We check if the user exists in the database first
      const existingUser = await usersDB.findOne({ email: dto.email });
      // If it does not exist, we insert it into the db
      if (!existingUser) {
        // Generates a hash for the user's password
        const hash = await argon.hash(dto.password);
        // Saves the user's email in the database and its respective hash
        const user = usersDB.insert({ email: dto.email, hash });
        return user;
      }
      // If it does exits, then we throw and exception
      throw new ForbiddenException('This email is already in use');
    } catch (error) {
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    try {
      // First, we check if the email is valid. Passes { _id: 0 } as second argument to avoid the query to return the db's id
      const existingUser = await usersDB.findOne(
        { email: dto.email },
        { _id: 0 },
      );
      if (existingUser) {
        return existingUser;
      }
      throw new ForbiddenException('Credentials incorrect');
    } catch (error) {
      throw error;
    }
  }
}
