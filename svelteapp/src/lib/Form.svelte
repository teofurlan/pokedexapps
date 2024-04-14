<form action="/api/pokemon" method="post">
    <h2 class="text-4xl text-yellow-400 drop-shadow-xl font-bold mb-3">Add a new pokemon</h2>
    <div class="flex items-center bg-red-300 bg-opacity-80 rounded-sm p-1.5 gap-2 hidden" id="id-error">
      <svg class="text-red-600 size-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
        viewBox="0 0 1024 1024">
        <path fill="currentColor"
          d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m0 832a384 384 0 0 0 0-768a384 384 0 0 0 0 768m48-176a48 48 0 1 1-96 0a48 48 0 0 1 96 0m-48-464a32 32 0 0 1 32 32v288a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32" />
      </svg>
      <span class="block text-red-500 text-base"></span>
    </div>
    <input type="number" min="1" name="id" placeholder="ID"
      class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
    <div class="flex items-center bg-red-300 bg-opacity-80 rounded-sm p-1.5 gap-2 hidden" id="name-error">
      <svg class="text-red-600 size-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
        viewBox="0 0 1024 1024">
        <path fill="currentColor"
          d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m0 832a384 384 0 0 0 0-768a384 384 0 0 0 0 768m48-176a48 48 0 1 1-96 0a48 48 0 0 1 96 0m-48-464a32 32 0 0 1 32 32v288a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32" />
      </svg>
      <span class="block text-red-500 text-base"></span>
    </div>
    <input type="text" name="name" placeholder="Name"
      class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
    <div class="flex items-center bg-red-300 bg-opacity-80 rounded-sm p-1.5 gap-2 hidden" id="types-error">
      <svg class="text-red-600 size-5" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
        viewBox="0 0 1024 1024">
        <path fill="currentColor"
          d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m0 832a384 384 0 0 0 0-768a384 384 0 0 0 0 768m48-176a48 48 0 1 1-96 0a48 48 0 0 1 96 0m-48-464a32 32 0 0 1 32 32v288a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32" />
      </svg>
      <span class="block text-red-600 text-base"></span>
    </div>
    <div id='tagContainer' class="flex gap-2 w-full relative">
      <input type="text" autocomplete="off" name="types" placeholder="Write some type and press enter to add it"
        class="my-1 w-full p-2 border border-gray-300 rounded-lg" />
      <div class="absolute w-full rounded-md top-full flex flex-col" id="typesSuggestions"></div>
    </div>
    <button type="submit"
      class="w-full p-2 bg-green-400 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-green-500">Agregar</button>
  </form>