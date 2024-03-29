fetch("http://localhost:4321/api/pokemon.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    // Creates an array from the json returned by the fetch and orders it from the ascending order
    pokemonList = Array.from(data.pokemonList).sort((a, b) => a.id - b.id);
    // Iterates through the ordered array of pokemons and display each one through the displayNewPokemon function
    for (pokemon of pokemonList) {
      displayNewPokemon(pokemon);
    }
  })
  .catch((error) => {
    // Throws an error if the fetch couldn't be done
    console.error("Error:", error);
  });

// Handle the event of submitting the form. Uses an async anonymous function so we can make the fetch to the post with await
document.querySelector("form").addEventListener("submit", async (event) => {
  // Avoid the execution of the default functionality for the from's submission
  event.preventDefault();
  // Stores the form in a variable to handle the interactivity easily
  const form = event.target;
  // Get the values submitted in the form
  const formData = new FormData(form);
  // Creates the new pokemon
  pokemon = {
    id: formData.get("id").toString().padStart(4, "0"),
    name: capitalizeFirstLetter(formData.get("name")),
    types: capitalizeFirstLetter(formData.get("types")),
  };
  // Cuts the function if any of the fields is empty
  if (!formData.get("id") || !formData.get("name")) {
    return;
  }
  // Fetches the POST method from the server to add a new pokemon to the list
  const response = await fetch("http://localhost:4321/api/pokemon.json", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(pokemon),
  });
  // Stores the answer of the fetch in this varible, if the pokemon could be added to the db, then it will be true. If it couldn't because a pokemon with that id of name already existed, it'll be false
  response.json().then((data) => {
    // Check if the new pokemon could be added to the db
    if (data.couldAdd) {
      // Creates a new li to put the pokemon on it and display it in the form
      displayNewPokemon(pokemon);
      // Orders the list of pokemons so it's in ascending order
      reoderPokemonsList();
    } else {
      // If the pokemon couldn't be added to the db, then checks if the cause was the id first
      if (data.property === "id") {
        // If it was, cleans the ID field in the form
        form.querySelector('input[name="id"]').value = "";
        // And displays the error message above the field
        document.getElementById("id-error").classList.toggle("hidden");
      } else if (data.property === "name") {
        // If the problem was not the id, it had to be the name, so do the sames process
        form.querySelector('input[name="name"]').value = "";
        document.getElementById("name-error").classList.toggle("hidden");
      }
    }
  });
});

// Handles the event of clicking the name's field in the form, checks if the error message was being displayed, if it was, then hides it
document.querySelector('input[name="id"]').addEventListener("click", () => {
  const errorMessage = document.getElementById("id-error");
  if (!errorMessage.classList.contains("hidden")) {
    errorMessage.classList.add("hidden");
  }
});

// Handles the event of clicking the id's field in the form, checks if the error message was being displayed, if it was, then hides it
document.querySelector('input[name="name"]').addEventListener("click", () => {
  const errorMessage = document.getElementById("name-error");
  if (!errorMessage.classList.contains("hidden")) {
    errorMessage.classList.add("hidden");
  }
});

// Handles the action of deleting a pokemon, adds only one event listener to the ul (parent element) and filters through the event.target
document
  .getElementById("pokemonsList")
  .addEventListener("submit", async (event) => {
    // Prevent the normal behavior of the form's submit action
    event.preventDefault();
    // Stores the form in a local variable to handle it easier
    const form = event.target;
    // Gets the pokemons id, which is stored in the form's id
    const pokemonId = form.getAttribute("id");
    // Fetches the server to delete the pokemon in the databae
    try {
      await fetch(`http://localhost:4321/api/pokemon/${pokemonId}.json`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({}),
      });
      // Deletes the pokemon from the dom
      form.parentNode.remove();
    } catch (error) {}
  });

// Takes a pokemon object as argrument, creates a li element in which puts the pokemon's properties and add it to the ul element in the document
const displayNewPokemon = (pokemon) => {
  // Cuts the exection if the parameter was empty
  if (!pokemon) {
    return;
  }
  const li = document.createElement("li");
  li.classList =
    "flex justify-between items-center h-10 bg-white border-b border-slate-300 px-3.5";
  li.id = `pokemon-${pokemon.id}`;
  const liContent =
    `<span class='flex alig-center text-black text-lg border-r border-slate-400 w-1/4'>${pokemon.id}</span>` +
    `<span class='text-black w-1/4 pl-2 border-slate-400 border-r'>${pokemon.name}</span>` +
    `<span class='text-black w-1/4 pl-2'>${pokemon.types}</span>` +
    `<form action='http://localhost:4321/api/pokemon/${pokemon.id}.json' method="post" class="w-1/4 text-right"
    id='${pokemon.id}'>
    <button type="submit" class="font-normal w-12 mr-3 text-center transition-all duration-150 hover:font-extrabold">X</button>	
    </form>`;
  li.innerHTML = liContent;
  document.getElementById("pokemonsList").appendChild(li);
};

// Formats a string to capitalize only its first letter
const capitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

// Reorder the list of pokemons in the ul
const reoderPokemonsList = () => {
  const pokemonList = document.getElementById("pokemonsList");
  // Get the list of li elements in the ul, that displays the properties of every pokemon
  const liList = Array.from(pokemonList.getElementsByTagName("li"));
  // Order the list for the pokemons' id, which is stored in the id of the forms inside the lis
  liList.sort((a, b) =>
    a.getAttribute("id").localeCompare(b.getAttribute("id"))
  );
  // Removes the current list
  pokemonList.innerHTML = "";
  // Add every pokemon again, but in the right order
  for (pokemon of liList) {
    pokemonList.appendChild(pokemon);
  }
};
