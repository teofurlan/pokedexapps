<script lang="ts">
  import { type Pokemon } from "../../utility/tools";
  import PokemonLi from "./PokemonLi.svelte";
  let types: Array<string> = ["Grass", "Poison"];

  const getPokemons = fetch("http://localhost:4321/api/pokemon.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Creates an array from the json returned by the fetch and orders it from the ascending order
      let pokemonList: Array<Pokemon> = Array.from(
        data.pokemonList as Pokemon[]
      ).sort((a, b) => parseInt(a.id) - parseInt(b.id));
      // Returns the list of pokemons so we can get it in the :then block
      return pokemonList;

    });
</script>

<ul class="mt-4 border-8 border-violet-700 rounded-lg" id="pokemonsList">
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
  {#await getPokemons then pokemonList}
    {#each pokemonList as pokemon}
      <PokemonLi {pokemon} />
    {/each}
  {:catch error}
    <p style="color: red">{error.message}</p>
  {/await}
</ul>
