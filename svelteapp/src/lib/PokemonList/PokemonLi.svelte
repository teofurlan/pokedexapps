<script lang="ts">
    import { getTypeColor, type Pokemon } from '../../utility/tools'
  export let pokemon: Pokemon;
  export let bgColor:string  

  const handleSubmit = async (event: Event) => {
    try {
      await fetch(`http://localhost:4321/api/pokemon/${pokemon.id}.json`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({}),
      });
      // Deletes the pokemon from the dom
      ((event.target as HTMLElement).parentNode as HTMLElement).remove();
    } catch (error) {}
  }
</script>
<li
  class="flex justify-between items-center h-10 border-b border-slate-700 px-3.5 last-of-type:border-0"
  style="{bgColor};"
  id="pokemon-{pokemon.id}"
>
  <span
    class="flex alig-center text-black text-lg border-r border-slate-700 w-1/4"
    >{pokemon.id}</span
  ><span class="text-black w-1/4 pl-2 border-slate-700 border-r">{pokemon.name}</span
  ><span class="text-black w-1/4 pl-2">{pokemon.types}</span>
  <form on:submit={handleSubmit}  class="w-1/4 text-right" id={pokemon.id}>
    <button
      type="submit"
      class="font-normal w-12 mr-3 text-center transition-all duration-150 hover:font-extrabold"
      >X</button
    >
  </form>
</li>
