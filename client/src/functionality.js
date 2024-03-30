const typesColors = {
  Normal: "#A8A77A",
  Fire: "#EE8130",
  Water: "#6390F0",
  Electric: "#F7D02C",
  Grass: "#7AC74C",
  Ice: "#96D9D6",
  Fighting: "#C22E28",
  Poison: "#A33EA1",
  Ground: "#E2BF65",
  Flying: "#A98FF3",
  Psychic: "#F95587",
  Bug: "#A6B91A",
  Rock: "#B6A136",
  Ghost: "#735797",
  Dragon: "#6F35FC",
  Dark: "#705746",
  Steel: "#B7B7CE",
  Fairy: "#D685AD",
};
let tags = [];
let selectedSuggestionIndex = -1;
const idInput = document.querySelector('input[name="id"]');
const typesInput = document.querySelector('input[name="types"]');
const nameInput = document.querySelector('input[name="name"]');

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

  // Displays errors if any of the fields is empty
  if (!formData.get("id")) {
    const idError = document.getElementById("id-error");
    idError.getElementsByTagName("span")[0].textContent = "Must have some id";
    idError.classList.toggle("hidden");
  }
  if (!formData.get("name")) {
    const nameError = document.getElementById("name-error");
    nameError.getElementsByTagName("span")[0].textContent =
      "Must have some name";
    nameError.classList.toggle("hidden");
  }
  if (tags.length === 0) {
    const typesError = document.getElementById("types-error");
    typesError.querySelector("span").textContent =
      "Must have at least one type";
    typesError.classList.remove("hidden");
  }
  // Cuts the function if any of the fields is empty
  if (!formData.get("id") || !formData.get("name") || tags.length === 0) {
    return;
  }
  // Creates the pokemon object
  pokemon = {
    id: formData.get("id").toString().padStart(4, "0"),
    name: capitalizeFirstLetter(formData.get("name")),
    types: tags,
  };
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
      // Cleans the tags list for the next pokemon to add
      tags = [];
      // Deletes all the tags from the Dom
      tagsElements = document
        .getElementById("tagContainer")
        .querySelectorAll("[data-tag]");
      for (element of tagsElements) {
        element.remove();
      }
      // Empties the inputs
      idInput.value = "";
      nameInput.value = "";
      // Creates a new li to put the pokemon on it and display it in the form
      displayNewPokemon(pokemon);
      // Orders the list of pokemons so it's in ascending order
      reoderPokemonsList();
    } else {
      // If the pokemon couldn't be added to the db, then checks if the cause was the id first
      if (data.property === "id") {
        // If it was, cleans the ID field in the form
        idInput.value = "";
        // And displays the error message above the field
        const idError = document.getElementById("id-error");
        idError.classList.toggle("hidden");
        idError.getElementsByTagName("span")[0].textContent =
          "This id is already asigned in the database";
      } else if (data.property === "name") {
        // If the problem was not the id, it had to be the name, so do the sames process
        nameInput.value = "";
        const nameError = document.getElementById("name-error");
        nameError.getElementsByTagName("span")[0].textContent =
          "This pokemon is already registered in the pokedex";
        nameError.classList.toggle("hidden");
      }
    }
  });
});

// Handles the event of clicking the name's field in the form, checks if the error message was being displayed, if it was, then hides it
idInput.addEventListener("focus", () => {
  const errorMessage = document.getElementById("id-error");
  if (!errorMessage.classList.contains("hidden")) {
    errorMessage.classList.add("hidden");
  }
});

// Handles the event of clicking the name's field in the form, checks if the error message was being displayed, if it was, then hides it
nameInput.addEventListener("focus", () => {
  const errorMessage = document.getElementById("name-error");
  if (!errorMessage.classList.contains("hidden")) {
    errorMessage.classList.add("hidden");
  }
});

// Handles the input of types in the form
typesInput.addEventListener("keypress", (event) => {
  // Check if the error message for the types is being shown, in which case hides it
  const errorMessage = document.getElementById("types-error");
  if (!errorMessage.classList.contains("hidden")) {
    errorMessage.classList.add("hidden");
  }
  // Checks if the pressed key was enter
  if (event.key === "Enter") {
    event.preventDefault();
    // Cleans the content of the suggestions
    document.getElementById("typesSuggestions").innerHTML = "";
    // Format the type
    const type = capitalizeFirstLetter(event.target.value);
    // Displays the tag with the introduced value
    if (!typesColors.hasOwnProperty(type)) {
      // If the type couldn't be displayed because it was not a real type, then show the error message
      errorMessage.querySelector("span").textContent =
        "This is not an existing pokemon's type";
      errorMessage.classList.remove("hidden");
    } else if (tags.length === 2) {
      // Shows an error if there are already to types tags
      errorMessage.querySelector("span").textContent =
        "A pokemon connot have more than 2 types";
      errorMessage.classList.remove("hidden");
    } else if (tags.includes(type)) {
      // Shows an error if this type was already added
      errorMessage.querySelector("span").textContent =
        "This typed is already added!";
      errorMessage.classList.remove("hidden");
    } else {
      // Add the type to the tags lists
      tags.push(type);
      // Displays the tag
      displayTypeTag(type);
    }
    // Cleans the input value
    event.target.value = "";
    // Sets the the variable to tab through the suggestions to -1 again so it resets
    selectedSuggestionIndex = -1;
  }
});

// Handles the input event, that allows to get the realtime text being written in the input. This event listener is used to show the suggestions below the typesInput
typesInput.addEventListener("input", () => {
  // Formats the input to lowwer case
  const inputValue = typesInput.value.toLowerCase();
  // Cuts the execution if the input is empty
  if (typesInput.value === "") {
    return;
  }
  // Checks if exists a type that starts with the introduced string
  const matchedTypes = Object.keys(typesColors).filter((type) =>
    type.toLocaleLowerCase().startsWith(inputValue)
  );
  // Queries the document to get the suggestions' container element
  const typesSuggestions = document.getElementById("typesSuggestions");
  // Ensures that it has no content
  typesSuggestions.innerHTML = "";
  // Iterates over each type in the list of matchedTypes
  matchedTypes.forEach((type) => {
    // Creates a div element to display the matching types
    const suggestion = document.createElement("div");
    // Creates a data-attribute to select it easier
    suggestion.setAttribute("data-autocomplete-item", "");
    // Styles the suggestion through its classList
    suggestion.classList = `flex items-center pl-4 h-10 bg-sky-200 w-full border-b border-slate-500 last-of-type:border-0 rounded-md drop-shadow-xl transition-all duration-150`;
    // Sets the type as the text of the suggestion element
    suggestion.textContent = type;
    // Adds an event listener for the click event to the div so we can select them
    suggestion.addEventListener("click", () => {
      // Sets the value of the typesInput to the pressed suggestion
      typesInput.value = type;
      // Cleans the suggestions container
      typesSuggestions.innerHTML = "";
      // Dispatches a keypress event with the key 'enter' so the functionality
      typesInput.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter" }));
    });
    // Adds the suggestion to the suggestions' container so it's displayed
    typesSuggestions.appendChild(suggestion);
  });
});

// Listens the press of any key to slide through the suggestions
typesInput.addEventListener("keydown", (event) => {
  // Get the list of displayed suggestions
  const suggestions = document.querySelectorAll("[data-autocomplete-item]");
  // Checks that the pressed key was the tab and if there is any suggestion at all
  if (event.key === "Tab" && suggestions.length > 0) {
    event.preventDefault();
    // Checks if the global variable selectedSuggestionsIndex is equal to -1, which means that no suggestion is selected yet
    if (selectedSuggestionIndex === -1) {
      // Start from the first suggestion
      selectedSuggestionIndex = 0;
    } else {
      // If not, calculates
      selectedSuggestionIndex =
        (selectedSuggestionIndex + 1) % suggestions.length;
    }
    highlightSuggestion(selectedSuggestionIndex);
    // Sets the input's value to the selected suggestion
    typesInput.value = suggestions[selectedSuggestionIndex].textContent;
  }
});

// Handles the styling of the suggestions for the typesInput
const highlightSuggestion = (index) => {
  const suggestions = document.querySelectorAll("[data-autocomplete-item]");
  suggestions.forEach((suggestion, i) => {
    if (i === index) {
      suggestion.classList.add("bg-sky-400", "scale-[1.005]");
    } else {
      suggestion.classList.remove("bg-sky-400", "scale-[1.005]");
    }
  });
};

// Clear autocomplete list when input loses focus
typesInput.addEventListener("blur", () => {
  document.getElementById("typesSuggestions").innerHTML = "";
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

/**
 * FUNCTIONS
 */

// Creates a tag for the type input which content is passed as the argument 'text'
const displayTypeTag = (type) => {
  // Creates the div container of the tag
  const tag = document.createElement("div");
  // Get the color of the type
  const tagColor = getTypeColor(capitalizeFirstLetter(type));
  // Retun if the returned color is null, which will happend if it's not a real type
  tag.classList = `flex flex-row items-center justify-center rounded-lg bg-[${tagColor}] my-1 px-2`;
  tag.setAttribute("data-tag", "");
  const tagContent = `<span class="mr-2">${type}</span><button class="flex items-center justify-center text-black size-[1.2rem]" onclick='removeTag(this.parentNode)'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 14.828L12.001 12m2.828-2.828L12.001 12m0 0L9.172 9.172M12.001 12l2.828 2.828M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12s4.477 10 10 10"/></svg></button>`;
  tag.innerHTML = tagContent;
  document.getElementById("tagContainer").appendChild(tag);
};

// Delete the tag where the x was pressed
const removeTag = (tag) => {
  tag.remove();
  // Removes the tag from the tags list
  tags = tags.filter((types) => types !== tag.textContent);
};

// Takes a pokemon object as argrument, creates a li element in which puts the pokemon's properties and add it to the ul element in the document
const displayNewPokemon = (pokemon) => {
  // Cuts the exection if the parameter was empty
  if (!pokemon) {
    return;
  }
  // Defines the color for the background of the pokemon
  let bgColor;
  // Checks if the pokemon has two types, in which case the bgColor will asigned with a string that contains the tailwind classes fo a gradient between the colors of the two types of the pokemon
  if (pokemon.types.length > 1) {
    bgColor = `bg-gradient-to-r from-[${getTypeColor(
      pokemon.types[0]
    )}] to-[${getTypeColor(pokemon.types[1])}]`;
  } else {
    // If the pokemon only has one type, then bgColor stores the tailwind class to set the bg of the li with that types color
    bgColor = `bg-[${getTypeColor(pokemon.types[0])}]`;
  }
  // Creates the li to display the pokemon
  const li = document.createElement("li");
  // Styles it through its classList and tailwind. Uses formatted string to pass the bgColor variable
  li.classList = `flex justify-between items-center h-10 border-b border-slate-700 px-3.5 last-of-type:border-0 ${bgColor}`;
  // Sets the id of the li which will have the following format 'pokemon-<id>', where the id is from the pokemon contained in that li
  li.id = `pokemon-${pokemon.id}`;
  // Creates a string to define the content of the li, where we passes the pokemon properties to spans
  const liContent =
    `<span class='flex alig-center text-black text-lg border-r border-slate-700 w-1/4'>${pokemon.id}</span>` +
    `<span class='text-black w-1/4 pl-2 border-slate-700 border-r'>${pokemon.name}</span>` +
    `<span class='text-black w-1/4 pl-2'>${pokemon.types}</span>` +
    `<form  class="w-1/4 text-right"
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

// Returns a color associated to the pokemon type, If the passed type does not exists, returns null
const getTypeColor = (type) => {
  if (typesColors.hasOwnProperty(type)) {
    return typesColors[type];
  }
  return null;
};
