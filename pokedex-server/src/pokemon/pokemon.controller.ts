import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';

@Controller('api/pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  async create(@Body() pokemon: CreatePokemonDto) {
    try {
      // Tries to add the new pokemon to the db and gets the addPokemon validation data
      const { idWasOk, nameWasOk } = await this.pokemonService.create(pokemon);
      if (idWasOk && nameWasOk) {
        return { validation: { idWasOk, nameWasOk } };
      }
      // throw new HttpException(
      //   'Object addition failed due to some reason',
      //   HttpStatus.CONFLICT,
      // );
      return { validation: { idWasOk, nameWasOk } };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  getPagesAmount() {
    return this.pokemonService.getPagesAmount();
  }

  @Get(':page')
  getPage(@Param('page') page: number) {
    return this.pokemonService.getPage(+page);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pokemonService.remove(id);
  }
}
