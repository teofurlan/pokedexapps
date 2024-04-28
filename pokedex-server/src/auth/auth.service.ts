import { Injectable } from '@nestjs/common';
import Datastore from 'nedb-promises';

console.log(Datastore);
const usersDB = Datastore.create({
  filename: 'src/pokemon/database/database.db',
  autoload: true,
});

@Injectable()
export class AuthService {
  constructor() {}

  async signup() {
    return 'Your account was created successfully!';
  }

  async signin() {
    return 'You signed in successfully!';
  }
}
