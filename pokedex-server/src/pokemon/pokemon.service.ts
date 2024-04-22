import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import Datastore from 'nedb-promises';

console.log(Datastore);
const db = Datastore.create({
  filename: 'src/pokemon/database/database.db',
  autoload: true,
});

@Injectable()
export class PokemonService {
  create(createPokemonDto: CreatePokemonDto) {
    console.log(createPokemonDto);
  }

  async getPagesAmount() {
    return Math.ceil((await db.find({})).length / 5);
  }

  async getPage(page: number) {
    return await db
      .find({})
      .sort({ id: 1 })
      .skip(5 * (page - 1))
      .limit(5);
  }

  async remove(id: string) {
    return db.remove({ id: id }, { multi: false });
  }
}
