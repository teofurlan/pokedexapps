<script lang="ts">
  import Form from "./lib/Form/Form.svelte";
  import Header from "./lib/Header.svelte";
  import PagingButton from "./lib/PagingButton.svelte";
  import PokemonList from "./lib/PokemonList/PokemonList.svelte";
  import type { Pokemon } from "./utility/tools";
  let pokemonList: Pokemon[] = [];
  let page = 0;

  const getPokemonFromServer = async (pageIndex: number = 0) => {
    if (pageIndex < 0) {
      return;
    }
    const response = fetch(
      `http://localhost:4321/api/pokemon.json?page=${pageIndex}`
    ).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
    return await response.then((data) => {
      if (pageIndex >= data.amountOfPages) {
        return;
      }
      // Creates an array from the json returned by the fetch and orders it from the ascending order
      page = pageIndex;
      return data.pokemonList as Pokemon[];
      // pokemonList = pokemonList;
    });
  };

  const updatePokemonList = (currentPage: number = page) => {
    getPokemonFromServer(currentPage).then((data) => {
      if (data) pokemonList = data as Pokemon[];
    });
  };

  // Sets the initial page, the one that corresponds to 0
  updatePokemonList();
</script>

<Header />
<main
  class="container min-w-full px-20 pt-10 flex flex-col pb-20 bg-black bg-opacity-50"
>
  <Form on:submit on:addPokemon={() => updatePokemonList(page)}/>
  <PokemonList
    bind:pokemonList={pokemonList}
    bind:page={page}
    on:updatePage={() => updatePokemonList(page)}
    on:getPreviousPage={() => updatePokemonList(page - 1)}
    on:getNextPage={() => updatePokemonList(page + 1)}
  />
</main>
