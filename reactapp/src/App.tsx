/* eslint-disable @typescript-eslint/no-unused-vars */
// import { useEffect, useState } from "react"

import { useEffect, useState } from "react";
import PokemonLi from "./components/PokemonLi";
import {
  Pokemon,
  capitalizeFirstLetter,
  getPokemonColor,
  getTypeColor,
} from "./utility/types";
import PagingFooter from "./components/PagingFooter";
import { Input } from "./components/Input";
import { TypesInput } from "./components/TypesInput";

const BASE_URL = "http://localhost:4321/api/pokemon/";

export default function App() {
  const [list, setList] = useState<Pokemon[]>([]);
  const [pageAmount, setPageAmount] = useState(1);
  const [page, setPage] = useState<number>(1);
  const [tagList, setTagList] = useState<Array<string>>([]);
  // Use states for error messages
  const [idError, setIdError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [typesError, setTypesError] = useState<string>("");

  // Fetch to the server's non-params GET method to get the amount of pages and stores then in the pageAmount's useEffect

  useEffect(() => {
    // Fetch to the server's non-params GET method to get the amount of pages and stores then in the pageAmount's useEffect
    fetch(BASE_URL)
      .then((res) => res.json())
      .then((data) => setPageAmount(data));
    fetch(`${BASE_URL}${page}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setList(data);
      });
  }, [page]);

  // Check if the value that is passed as parameter is between the range of pages, in which case updates the page useState
  const updatePokemonList = (pageIndex: number) => {
    if (pageIndex > 0 && pageIndex <= pageAmount) {
      setPage(pageIndex);
    }
  };

  const addPokemon = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    // Get the information of the form
    const data = new FormData(form);
    if (!clientSideValidation(data)) {
      return;
    }
    const pokemon: Pokemon = {
      id: (data.get("id") as string).toString().padStart(4, "0"),
      name: capitalizeFirstLetter(data.get("name") as string),
      types: tagList,
    };

    fetch(BASE_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(pokemon),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.validation.idWasOk && data.validation.nameWasOk) {
          // Cleans the tags list for the next pokemon to add
          setTagList([]);
          // Cleans the inputs' value
          form.reset();
        } else {
          // If the pokemon couldn't be added to the db, then checks if the cause was the id first
          if (!data.validation.idWasOk) {
            setIdError("This id already exists in the database");
          }
          if (!data.validation.nameWasOk) {
            setNameError("This name already exists in the database");
          }
        }
      });
  };

  const clientSideValidation = (data: FormData): boolean => {
    let isCorrect: boolean = true;
    if (!data.get("id")) {
      setIdError("Must have some id");
      isCorrect = false;
    }
    if (!data.get("name")) {
      setNameError("Must have some name");
      isCorrect = false;
    }
    if (tagList.length === 0) {
      setTypesError("Must have at least one type");
      isCorrect = false;
    }
    return isCorrect;
  };

  const handleTagAddition = (event: React.KeyboardEvent): boolean | void => {
    if (!(event.key === "Enter")) {
      return;
    }
    event.preventDefault();
    return addTag((event.target as HTMLInputElement).value);
  };

  const addTag = (tag: string): boolean => {
    console.log("tag: ", tag);
    if (!getTypeColor(tag)) {
      setTypesError("This is not an existing pokemon's type");
    } else if (tagList.length === 2) {
      setTypesError("A pokemon cannot have more than 2 types");
    } else if (tagList.includes(tag)) {
      setTypesError("This type is already added!");
    } else {
      // Add the new task to the list
      setTagList([...tagList, tag]);
      // Clear any possible error for the types input
      setTypesError("");
      return true;
    }
    return false;
  };

  const deleteTag = (tag: string) => {
    setTagList(tagList.filter((type) => type !== tag) as []);
  };

  return (
    <div>
      <header className="h-60 flex justify-center items-center bg-black bg-opacity-80">
        <h1 className="flex text-9xl text-yellow-400 font-extrabold bot z-40 drop-shadow-2xl">
          P
          <span className="text-8xl flex flex-col justify-end text-red-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M14.5 12a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 1 5 0m7.5 0c0 5.52-4.48 10-10 10S2 17.52 2 12S6.48 2 12 2s10 4.48 10 10m-2 0h-4c0-2.21-1.79-4-4-4s-4 1.79-4 4H4c0 4.41 3.59 8 8 8s8-3.59 8-8"
              />
            </svg>
          </span>
          kedex
        </h1>
      </header>
      <main className="container min-w-full px-20 pt-10 flex flex-col pb-20 bg-black bg-opacity-50">
        <h2 className="text-4xl text-yellow-400 drop-shadow-xl font-bold mb-3">
          Add a new pokemon
        </h2>
        <form onSubmit={addPokemon}>
          <Input
            type={"number"}
            name={"id"}
            holder={"ID"}
            error={idError}
            clearError={() => setIdError("")}
          />
          <Input
            type={"text"}
            name={"name"}
            holder={"Name"}
            error={nameError}
            clearError={() => setNameError("")}
          />
          <TypesInput
            holder={"Write some type and press enter to add it"}
            error={typesError}
            handleTagAddition={handleTagAddition}
            addTag={addTag}
            deleteTag={deleteTag}
            typesTags={tagList}
            clearError={() => setTypesError("")}
          />
          <button
            type="submit"
            className="w-full p-2 bg-green-400 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-green-500"
          >
            Add
          </button>
        </form>
        <ul
          className="mt-4 border-8 border-violet-800 rounded-lg min-h-[16.25rem] bg-black bg-opacity-50"
          id="pokemonList"
        >
          <li className="flex items-center justify-between p-2 bg-violet-800 text-yellow-400">
            <span className="text-lg font-extrabold w-1/4 pl-3">ID</span>
            <span className="text-lg font-extrabold w-1/4 text-left pl-4">
              Name
            </span>
            <span className="text-lg font-extrabold w-1/4 text-left pl-4">
              Type/s
            </span>
            <span className="text-lg font-extrabold w-1/4 text-right pr-3">
              Delete
            </span>
          </li>
          {list.map((pokemon) => (
            <PokemonLi
              key={pokemon.id}
              pokemon={pokemon}
              bgColor={getPokemonColor(pokemon as Pokemon)}
            />
          ))}
        </ul>
        <PagingFooter
          leftAction={() => {
            updatePokemonList(page - 1);
          }}
          rightAction={() => {
            updatePokemonList(page + 1);
          }}
        >
          {page}
        </PagingFooter>
      </main>
    </div>
  );
}
