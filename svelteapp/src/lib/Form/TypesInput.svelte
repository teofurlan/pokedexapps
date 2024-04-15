<script lang="ts">
  import type { KeyboardEventHandler } from "svelte/elements";
  import InputError from "./InputError.svelte";
  import { capitalizeFirstLetter, getTypeColor } from "../../utility/tools";
  import TypeTag from "./TypeTag.svelte";
  // Exports the variable that is through which the error will be passed, if any.
  export let error: Array<string> = [];
  export let typesTags: Array<string> = [];

  const handleTypeInput: KeyboardEventHandler<HTMLInputElement> = (
    event: KeyboardEvent
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      // Stores the input in a variable to handle it easier
      const typesInputElemet = event.target as HTMLInputElement;
      // Format the type
      const type = capitalizeFirstLetter(typesInputElemet.value);
      // Validates the type, if it doesn't exit, displays the error message
      if (!getTypeColor(type)) {
        error = ["This is not an existing pokemon's type"];
      } else if (typesTags.length === 2) {
        error = ["A pokemon cannot have more than 2 types"];
      } else if (typesTags.includes(type)) {
        error = ["This type is already added!"];
      } else {
        // By adding the type to the tag like this, svelte will react when the list is updated
        typesTags = [...typesTags, type];
        // console.log(typesTags)
      }
      // Cleans the input's value
      typesInputElemet.value = "";
    }
  };

  const cleanError = () => {
    error = [];
  };
</script>

{#if error.length}
  <InputError>{error}</InputError>
{/if}
<div id="tagContainer" class="flex gap-2 w-full relative">
  <!-- Types' input -->
  <input
    type="text"
    autocomplete="off"
    name="types"
    placeholder="Write some type and press enter to add it"
    class="my-1 w-full p-2 border border-gray-300 rounded-lg"
    on:keypress={handleTypeInput}
    on:focus={cleanError}
    on:input={cleanError}
  />
  {#each typesTags as tag}
    <TypeTag type={tag} on:removedTag />
  {/each}
  <div
    class="absolute w-full rounded-md top-full flex flex-col"
    id="typesSuggestions"
  ></div>
</div>
