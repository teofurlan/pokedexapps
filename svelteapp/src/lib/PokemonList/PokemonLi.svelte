<script lang="ts">
  import { fly, slide } from 'svelte/transition';
    import { getTypeColor, type Pokemon } from '../../utility/tools'
  export let pokemon: Pokemon;
  export let bgColor:string  
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
  <form class="w-1/4 text-right" id={pokemon.id}>
    <button
      type="submit"
      class="font-normal w-12 mr-3 text-center transition-all duration-150 hover:font-extrabold"
      >X</button
    >
  </form>
</li>
