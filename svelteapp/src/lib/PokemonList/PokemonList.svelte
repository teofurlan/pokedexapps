<script lang="ts">
  import { getTypeColor, type Pokemon } from "../../utility/tools";
  import PagingButton from "../PagingButton.svelte";
  import PokemonLi from "./PokemonLi.svelte";

  let pokemonList: Pokemon[] = [];
  let page = 0;

  const getPokemonFromServer = (page: number = 0) => {
    fetch(`http://localhost:4321/api/pokemon.json?page=${page}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Creates an array from the json returned by the fetch and orders it from the ascending order
        pokemonList = Array.from(data.pokemonList as Pokemon[]).sort(
          (a, b) => parseInt(a.id) - parseInt(b.id)
        );
        // Returns the list of pokemons so we can get it in the :then block
        pokemonList = pokemonList;
      });
  };

  const getPokemonColor = (pokemon: Pokemon): string => {
    if (pokemon.types.length > 1) {
      return `background-image: linear-gradient(to right, ${getTypeColor(
        pokemon.types[0]
      )}, ${getTypeColor(pokemon.types[1])})`;
    } else {
      // If the pokemon only has one type, then bgColor stores the tailwind class to set the bg of the li with that types color
      return `background-color: ${getTypeColor(pokemon.types[0])}`;
    }
  };

  getPokemonFromServer(page);
</script>

<ul
  class="mt-4 border-8 border-violet-700 rounded-lg min-h-64 bg-black bg-opacity-80"
  id="pokemonsList"
>
  <li class="flex items-center justify-between p-2 bg-violet-700">
    <span class="text-lg text-white font-extrabold w-1/4 pl-3">ID</span>
    <span class="text-lg text-white font-extrabold w-1/4 text-left pl-4"
      >Name</span
    >
    <span class="text-lg text-white font-extrabold w-1/4 text-left pl-4"
      >Type/s</span
    >
    <span class="text-lg text-white font-extrabold w-1/4 text-right pr-3"
      >Delete</span
    >
  </li>
  {#each pokemonList as pokemon}
    <PokemonLi {pokemon} bgColor={getPokemonColor(pokemon)} />
  {/each}
</ul>
<div class="flex gap-3 items-center justify-center">
  <PagingButton textContent={"<"} action={() => getPokemonFromServer(--page)} />
  <PagingButton textContent={">"} action={() => getPokemonFromServer(++page)} />
</div>
