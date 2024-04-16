<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { getTypeColor, type Pokemon } from "../../utility/tools";
  import PagingButton from "../PagingButton.svelte";
  import PokemonLi from "./PokemonLi.svelte";
  export let pokemonList: Pokemon[] = [];
  export let page: number;

  const dispatch = createEventDispatcher<{
    getNextPage: null;
    getPreviousPage: null;
  }>();

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
</script>

<ul
  class="mt-4 border-8 border-violet-800 rounded-lg min-h-[16.25rem] bg-black bg-opacity-50"
  id="pokemonsList"
>
  <li
    class="flex items-center justify-between p-2 bg-violet-800 text-yellow-400"
  >
    <span class="text-lg font-extrabold w-1/4 pl-3">ID</span>
    <span class="text-lg font-extrabold w-1/4 text-left pl-4">Name</span>
    <span class="text-lg font-extrabold w-1/4 text-left pl-4">Type/s</span>
    <span class="text-lg font-extrabold w-1/4 text-right pr-3">Delete</span>
  </li>
  {#each pokemonList as pokemon}
    <PokemonLi
      {pokemon}
      bgColor={getPokemonColor(pokemon)}
      on:updatePage
    />
  {/each}
</ul>
<div class="flex gap-3 items-center justify-center mt-3 text-yellow-400">
  <PagingButton direction={"left"} action={() => dispatch('getPreviousPage')} />
  <div
    class="flex items-center justify-center text-bold bg-violet-800 w-20 h-10 font-bold text-xl rounded-md"
  >
    {page + 1}
  </div>
  <PagingButton
    direction={"right"}
    action={() => dispatch('getNextPage')}
  />
</div>
