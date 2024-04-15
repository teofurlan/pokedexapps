<script lang="ts">
  import { getTypeColor, type Pokemon } from "../../utility/tools";
  import PagingButton from "../PagingButton.svelte";
  import PokemonLi from "./PokemonLi.svelte";

  let pokemonList: Pokemon[] = [];
  let page = 0;
  let amountOfPages: number | null = 0;

  const getPokemonFromServer = (pageIndex: number = 0) => {
    
    if (pageIndex < 0 ) {
      return;
    }
    fetch(`http://localhost:4321/api/pokemon.json?page=${pageIndex}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (pageIndex >= data.amountOfPages) { return }
        // Creates an array from the json returned by the fetch and orders it from the ascending order
        pokemonList = Array.from(data.pokemonList as Pokemon[])
        // Returns the list of pokemons so we can get it in the :then block
        pokemonList = pokemonList;
        page = pageIndex
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

  // Sets the initial page, the one that corresponds to 0
  getPokemonFromServer(page);
</script>

<ul
  class="mt-4 border-8 border-violet-800 rounded-lg min-h-[16.25rem] bg-black bg-opacity-80"
  id="pokemonsList"
>
  <li class="flex items-center justify-between p-2 bg-violet-800">
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
<div class="flex gap-3 items-center justify-center mt-3">
  <PagingButton
    direction={"left"}
    action={() => getPokemonFromServer(page - 1)}
  />
  <div
    class="flex items-center justify-center text-bold bg-violet-800 w-20 h-10 font-bold text-2xl rounded-md"
  >
    {page + 1}
  </div>
  <PagingButton
    direction={"right"}
    action={() => getPokemonFromServer(page + 1)}
  />
</div>
