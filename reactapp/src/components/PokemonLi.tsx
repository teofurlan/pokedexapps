// import { useState } from "react";

export default function PokemonLi({pokemon, bgColor}) {
    // pokemon = useState([])
  return (
    <li
      className="flex justify-between items-center h-10 border-b border-slate-700 px-3.5 last-of-type:border-0 bg-red-500"
      style={bgColor}
      data-id={`pokemon-${pokemon.id}`}
    >
      <span className="flex alig-center text-black text-lg border-r border-slate-700 w-1/4">
        {pokemon.id}
      </span>
      <span className="text-black w-1/4 pl-2 border-slate-700 border-r">
        {pokemon.name}
      </span>
      <span className="text-black w-1/4 pl-2">
        {pokemon.types.join(', ')}
        </span>
      <form className="w-1/4 text-right" id={pokemon.id}>
        <button
          type="submit"
          className="font-normal w-12 mr-3 text-center transition-all duration-150 hover:font-extrabold"
        >
          X
        </button>
      </form>
    </li>
  );
}
