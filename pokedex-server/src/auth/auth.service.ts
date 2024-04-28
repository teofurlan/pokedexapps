import { Injectable } from '@nestjs/common';
import Datastore from 'nedb-promises';

console.log(Datastore);
const usersDB = Datastore.create({
  filename: 'src/database/users.db',
  autoload: true,
});

@Injectable()
export class AuthService {
  constructor() {}

  async signup() {
    try {
      return
    } catch (error) {}
  }

  async signin() {
    return 'You signed in successfully!';
  }
}
