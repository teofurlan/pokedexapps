import type { APIContext, APIRoute } from "astro";
import {
  addPokemon,
  getPokemonList,
  type Pokemon,
} from "../../../services/db/database";

// Get the pokemons list stored in the db through getPokemonLis. Returns a response with the list in it
export const GET: APIRoute = async (context) => {
  const page = parseInt(context.url.searchParams.get('page') ?? '1', 10)
  const pokemonList = await getPokemonList(page);
  return new Response(JSON.stringify({ pokemonList }), {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};


// Tries to add the pokemon that gets from the request. If successful, then returns the couldAdd value, that will be true. Otherwise, returns the property that already existed in the db along with a false value for couldAdd
export const POST: APIRoute = async (context: APIContext) => {
  try {
    const pokemon = await context.request.json();
    const { couldAdd, property} = await addPokemon(pokemon as Pokemon)
    if (couldAdd) {
      return new Response(JSON.stringify({ couldAdd }), {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    return new Response(JSON.stringify({ couldAdd, property }));
  } catch (error) {
    return new Response(JSON.stringify({ Error: error }));
  }
};
