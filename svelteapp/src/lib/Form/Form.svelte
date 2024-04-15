<script lang="ts">
  // import { createEventDispatcher } from "svelte";
  // const dispatch = createEventDispatcher()
  import IdInput from "./IdInput.svelte";
  import NameInput from "./NameInput.svelte";
  import TypesInput from "./TypesInput.svelte";
  // Defines the pokemon type
  type Pokemon = {
    id: string;
    name: string;
    types: Array<string>;
  };
  let errors: Pokemon = {
    id: "",
    name: "",
    types: [],
  };
  let typesTags:Array<string> = []
  const submit = (event: Event) => {
    // Get the values submitted in the form
    const data = new FormData(event.target as HTMLFormElement);
    // Validates the inputs in the client first
    clienSideValidation(data)
  };

  const clienSideValidation = (data: FormData) => {
    if (!data.get("id")) {
      errors.id = "Must have some id";
    }
    if (!data.get("name")) {
      errors.name = "Must have some name";
    }
    if (typesTags.length === 0) {
    errors.types = ["Must have at least one type"];
  }
  };

  const deteleTypeFromList = (event : CustomEvent<string>) => {
    console.log('Pressed type: '+ event.detail)
    typesTags = [...typesTags.filter(type => type !== event.detail)]
  };
</script>

<form on:submit|preventDefault={submit}>
  <!-- Form heading -->
  <h2 class="text-4xl text-yellow-400 drop-shadow-xl font-bold mb-3">
    Add a new pokemon
  </h2>
  <!-- Passes the error throw the bind to the IdInput component -->
  <IdInput bind:error={errors.id} />

  <NameInput  bind:error={errors.name}/>

  <TypesInput  bind:error={errors.types} on:removedTag={deteleTypeFromList} bind:typesTags={typesTags}/>

  <button
    type="submit"
    class="w-full p-2 bg-green-400 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-green-500"
    >Add</button
  >
</form>
