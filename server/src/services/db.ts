import Datastore from "nedb-promises";
import type { Pokemon } from "./pokemon";

// Checks if there is a database with that path already created, if not, creates it
const db = Datastore.create({
  filename: "/data/db",
  autoload: true,
});

// Returns all the pokemons in the database
export const getPokemonList = async (): Promise<Pokemon[]> => {
  return await db.find({});
};

export const getPagePokemon = async (page: number): Promise<Pokemon[]> => {
  return db.find<Pokemon>({}).skip(5*page).limit(5);
};

// Takes a pokemon as argument. Returns an object with with couldAdd and property attributes.
// First, checks if a pokemon with the passed pokemon's id already exits in the database, if it does, the return false and the the name of the  property that causes trouble: id. If the id don't exits in the db, then do the same for the name. Cuts the execution in both validations so only if both properties are new in the db, the pokemon is added to the db and couldAdd is returned as true.
export const addPokemon = async (
  pokemon: Pokemon
): Promise<{ couldAdd: boolean; property: string }> => {
  const validation = await checkIfExits(pokemon);
  if (validation.id) {
    return { couldAdd: false, property: "id" };
  }
  if (validation.name) {
    return { couldAdd: false, property: "name" };
  }
  // if (!validation.id && !validation.name) {
  //   db.insert(pokemon);
  // }
  db.insert(pokemon);
  return { couldAdd: true, property: "" };
};

// Removes the pokemon in the db that has the id passed in the parameter
export const deletePokemon = async (id: string): Promise<number> => {
  return db.remove({ id: id }, { multi: false });
};

// Test if the pokemons properties are in the database and returns the results in an object with the name of the properties as to store the boolean values. true means that the property already exists in the db
const checkIfExits = async (
  pokemon: Pokemon
): Promise<{ id: boolean; name: boolean }> => {
  const idTest = await db.findOne({ id: pokemon.id });
  const nameTest = await db.findOne({ name: pokemon.name });
  return { id: idTest !== null, name: nameTest !== null };
};
