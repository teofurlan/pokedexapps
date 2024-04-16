<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher<{
    suggestionPress: string
  }>()
  export let type: string;

  const selectSuggestion = () => {
    dispatch('suggestionPress', type)
  }

</script>

<button
  class="flex items-center pl-4 h-10 bg-sky-200 w-full border-b border-slate-500 last-of-type:border-0 rounded-md drop-shadow-xl transition-all duration-150"
on:click|preventDefault={selectSuggestion}>
  {type}
</button>
