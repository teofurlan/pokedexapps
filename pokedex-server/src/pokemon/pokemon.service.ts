import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import Datastore from 'nedb-promises';

console.log(Datastore);
const db = Datastore.create({
  filename: 'src/database/pokemon.db',
  autoload: true,
});

@Injectable()
export class PokemonService {
  create = async (
    pokemon: CreatePokemonDto,
  ): Promise<{ idWasOk: boolean; nameWasOk: boolean }> => {
    const validation = await this.checkIfExits(pokemon);
    if (!validation.id && !validation.name) {
      db.insert(pokemon);
      return { idWasOk: !validation.id, nameWasOk: !validation.name };
    }
    return { idWasOk: !validation.id, nameWasOk: !validation.name };
  };

  checkIfExits = async (
    pokemon: CreatePokemonDto,
  ): Promise<{ id: boolean; name: boolean }> => {
    const idTest = await db.findOne({ id: pokemon.id });
    const nameTest = await db.findOne({ name: pokemon.name });
    return { id: idTest !== null, name: nameTest !== null };
  };
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
