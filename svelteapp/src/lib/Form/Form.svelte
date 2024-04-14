<script>
  import InputError from "./InputError.svelte";
</script>

<form action="/api/pokemon" method="post">
  <h2 class="text-4xl text-yellow-400 drop-shadow-xl font-bold mb-3">
    Add a new pokemon
  </h2>
  <InputError />
  <input
    type="number"
    min="1"
    name="id"
    placeholder="ID"
    class="my-1 w-full p-2 border border-gray-300 rounded-lg"
  />
  <InputError />
  <input
    type="text"
    name="name"
    placeholder="Name"
    class="my-1 w-full p-2 border border-gray-300 rounded-lg"
  />
  <InputError />
  <div id="tagContainer" class="flex gap-2 w-full relative">
    <input
      type="text"
      autocomplete="off"
      name="types"
      placeholder="Write some type and press enter to add it"
      class="my-1 w-full p-2 border border-gray-300 rounded-lg"
    />
    <div
      class="absolute w-full rounded-md top-full flex flex-col"
      id="typesSuggestions"
    ></div>
  </div>
  <button
    type="submit"
    class="w-full p-2 bg-green-400 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-green-500"
    >Add</button
  >
</form>
