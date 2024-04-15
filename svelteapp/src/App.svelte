<script lang="ts">
  import Form from "./lib/Form/Form.svelte";
  import Header from "./lib/Header.svelte";
  import PokemonList from "./lib/PokemonList/PokemonList.svelte";
</script>

<Header />
<main
  class="container min-w-full px-20 pt-10 flex flex-col pb-20 bg-black bg-opacity-50"
>
  <Form />
  <PokemonList />
</main>
