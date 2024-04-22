export const typesColors: object = {
  Normal: "#A8A77A",
  Fire: "#EE8130",
  Water: "#6390F0",
  Electric: "#F7D02C",
  Grass: "#7AC74C",
  Ice: "#96D9D6",
  Fighting: "#C22E28",
  Poison: "#A33EA1",
  Ground: "#E2BF65",
  Flying: "#A98FF3",
  Psychic: "#F95587",
  Bug: "#A6B91A",
  Rock: "#B6A136",
  Ghost: "#735797",
  Dragon: "#6F35FC",
  Dark: "#705746",
  Steel: "#B7B7CE",
  Fairy: "#D685AD",
};

export type Pokemon = {
  id: string;
  name: string;
  types: Array<string>;
};

export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const getTypeColor = (type: string) => {
  type = capitalizeFirstLetter(type.toLocaleLowerCase());
  if (Object.prototype.hasOwnProperty.call(typesColors, type)) {
    return typesColors[type];
  }
  return null;
};

export const getPokemonColor = (pokemon: Pokemon): object => {
  if (pokemon.types.length > 1) {
    return {
      backgroundImage: `linear-gradient(to right, ${getTypeColor(
        pokemon.types[0]
      )}, ${getTypeColor(pokemon.types[1])})`,
    };
  } else {
    // If the pokemon only has one type, then bgColor stores the tailwind class to set the bg of the li with that types color
    return { backgroundColor: `${getTypeColor(pokemon.types[0])}` };
  }
};
