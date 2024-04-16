<script lang="ts">
  import { capitalizeFirstLetter } from "../../utility/tools";
  import IdInput from "./IdInput.svelte";
  import NameInput from "./NameInput.svelte";
  import TypesInput from "./TypesInput.svelte";
  import { createEventDispatcher } from "svelte";
  export const dispatch = createEventDispatcher<{
    addPokemon: null;
  }>();
  let idInputValue:string, nameInputValue:string 

  // Defines the pokemon type
  type Pokemon = {
    id: string;
    name: string;
    types: Array<string>;
  };
  // Object used for passing the erros to the different input components
  let errors: Pokemon = {
    id: "",
    name: "",
    types: [],
  };
  // Array to store the types added to the form
  let typesTags: Array<string> = [];
  //
  const submit = (event: Event) => {
    // Get the values submitted in the form
    const data = new FormData(event.target as HTMLFormElement);
    // Validates the inputs in the client first
    if (clientSideValidation(data)) {
      // Creates a new Pokemon object to pass it to the server
      const pokemon: Pokemon = {
        id: (data.get("id") as string).toString().padStart(4, "0"),
        name: capitalizeFirstLetter(data.get("name") as string),
        types: typesTags,
      };
      addPokemonToDatabase(pokemon);
    }
  };

  // Executes a validation based on the inputs' format
  const clientSideValidation = (data: FormData): boolean => {
    let isCorrect:boolean = true
    if (!data.get("id")) {
      errors.id = "Must have some id";
      isCorrect = false;
    }
    if (!data.get("name")) {
      errors.name = "Must have some name";
      isCorrect = false
    }
    if (typesTags.length === 0) {
      errors.types = ["Must have at least one type"];
      isCorrect = false
    }
    return isCorrect;
  };

  const addPokemonToDatabase = async (pokemon: Pokemon) => {
    const response = await fetch("http://localhost:4321/api/pokemon.json", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(pokemon),
    });
    // Stores the answer of the fetch in this varible, if the pokemon could be added to the db, then it will be true. If it couldn't because a pokemon with that id or name already existed, it'll be false
    response.json().then((data) => {
      // Check if the new pokemon could be added to the db
      if (data.validation.idWasOk && data.validation.nameWasOk) {
        // Cleans the tags list for the next pokemon to add
        typesTags = [];
        // Cleans the inputs' value
        idInputValue = ''
        nameInputValue = ''
        dispatch('addPokemon')
      } else {
        // If the pokemon couldn't be added to the db, then checks if the cause was the id first
        if (!data.validation.idWasOk) {
          errors.id = 'This id already exists in the database'
        }
        if (!data.validation.nameWasOk) {
          errors.name = 'This name already exists in the database'
        }
      }
    });
  };

  const deteleTypeFromList = (event: CustomEvent<string>) => {
    typesTags = [...typesTags.filter((type) => type !== event.detail)];
  };
</script>

<form on:submit|preventDefault={submit}>
  <!-- Form heading -->
  <h2 class="text-4xl text-yellow-400 drop-shadow-xl font-bold mb-3">
    Add a new pokemon
  </h2>
  <!-- Passes the error throw the bind to the IdInput component -->
  <IdInput bind:error={errors.id} bind:value={idInputValue}/>

  <NameInput bind:error={errors.name} bind:value={nameInputValue}/>

  <TypesInput
    bind:error={errors.types}
    on:removedTag={deteleTypeFromList}
    bind:typesTags
  />

  <button
    type="submit"
    class="w-full p-2 bg-green-400 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-green-500"
    >Add</button
  >
</form>
