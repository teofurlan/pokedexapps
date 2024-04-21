import { Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@Injectable()
export class PokemonService {
  create(createPokemonDto: CreatePokemonDto) {
    console.log(createPokemonDto);
    return 'This action adds a new pokemon';
  }

  getPage(page: number) {
    console.log(page);
    return `This is the page ${page} of pokemon`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
