import type { APIContext, APIRoute } from "astro";
import {
  addPokemon,
  getAmountOfPages,
  getPokemonList,
  type Pokemon,
} from "../../../services/db/database";

// Get the pokemons list stored in the db through getPokemonLis. Returns a response with the list in it
export const GET: APIRoute = async (context) => {
  const page = parseInt(context.url.searchParams.get("page") ?? "1", 10);
  const pokemonList = await getPokemonList(page);
  return new Response(
    JSON.stringify({ pokemonList, amountOfPages: await getAmountOfPages() }),
    {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};

// Tries to add the pokemon that gets from the request. If successful, then returns true for both attributes, id and name. Otherwise, if the pokemon couldn't be added, then it will return false for attribute than already exists in the db, that of course can be both, as well
export const POST: APIRoute = async (context: APIContext) => {
  try {
    // Gets the pokemon that's passed through the body of the request
    const pokemon = await context.request.json();
    // Tries to add the new pokemon to the db and gets the addPokemon validation data
    const { idWasOk, nameWasOk } = await addPokemon(pokemon as Pokemon);
    if (idWasOk && nameWasOk) {
      return new Response(
        JSON.stringify({ validation: { idWasOk, nameWasOk } }),
        {
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }
    return new Response(JSON.stringify({ validation: { idWasOk, nameWasOk } }));
  } catch (error) {
    return new Response(JSON.stringify({ Error: error }));
  }
};
