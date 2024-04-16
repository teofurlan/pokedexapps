<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Suggestion from "./Suggestion.svelte";

  const dispatch = createEventDispatcher<{ suggestionPress: null }>();
  export let value: string;
  export let suggestionsList: Array<string>;

  const handleSuggestionPress = (event: CustomEvent) => {
    // Sets the value of the typesInput to the pressed suggestion
    value = event.detail as string;
    // Cleans the suggestions container
    suggestionsList = [];
    // Dispatches a keypress event with the key 'enter' so the functionality
    dispatch("suggestionPress");
  };
</script>

<div
  class="absolute w-full rounded-md top-full flex flex-col"
  id="typesSuggestions"
>
  {#each suggestionsList as suggestion}
    <Suggestion type={suggestion} on:suggestionPress={handleSuggestionPress} />
  {/each}
</div>
