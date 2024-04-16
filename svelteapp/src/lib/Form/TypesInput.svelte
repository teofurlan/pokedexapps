<script lang="ts">
  import type { KeyboardEventHandler } from "svelte/elements";
  import InputError from "./InputError.svelte";
  import {
    capitalizeFirstLetter,
    getTypeColor,
    typesColors,
  } from "../../utility/tools";
  import TypeTag from "./TypeTag.svelte";
  import TypeSuggestions from "../TypesSuggestions/TypeSuggestions.svelte";
  // Exports the variable that is through which the error will be passed, if any.
  export let error: Array<string> = [];
  export let typesTags: Array<string> = [];
  let value: string = "";
  let suggestionsList: Array<string> = [];
  const handleTypeInput: KeyboardEventHandler<HTMLInputElement> = (
    event: KeyboardEvent
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTypeTag();
    }
  };

  const addTypeTag = () => {
    // Format the type
    const type = capitalizeFirstLetter(value);
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
    value = "";
  };

  const updateSuggestions = () => {
    suggestionsList = Object.keys(typesColors).filter((type) =>
      type.toLocaleLowerCase().startsWith(value.toLocaleLowerCase())
    );
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
    bind:value
    class="my-1 w-full p-2 border border-gray-300 rounded-lg"
    on:keypress={handleTypeInput}
    on:focus={cleanError}
    on:input={() => {
      cleanError();
      updateSuggestions();
    }}
  />
  {#each typesTags as tag}
    <TypeTag type={tag} on:removedTag />
  {/each}
  <TypeSuggestions
    bind:value
    bind:suggestionsList
    on:suggestionPress={addTypeTag}
  />
</div>
