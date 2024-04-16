export const typesColors = {
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
type PokemonType = keyof typeof typesColors

export type Pokemon = {
  id: string,
  name: string,
  types: Array<string>
}

// Formats a string to capitalize only its first letter
export const capitalizeFirstLetter = (text: string) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const getTypeColor = (type: string) => {
  if (typesColors.hasOwnProperty(type)) {
    return typesColors[type as PokemonType];
  }
  return null;
};