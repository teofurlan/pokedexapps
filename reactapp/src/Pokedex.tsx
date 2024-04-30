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
import { BASE_URL, fireAlert } from "./utility";
import PagingFooter from "./components/PagingFooter";
import { Input } from "./components/Input";
import { TypesInput } from "./components/TypesInput";
import Signin from "./components/Signin";
import Cookies from "universal-cookie";
import { InvalidTokenError, jwtDecode } from "jwt-decode";

export default function Pokedex() {
  // Initialize cookies manager
  const cookies = new Cookies();
  // Stores the token to validate the user when the page is refreshed so he/she does not have to log in again
  const [token, setToken] = useState(null);
  // Stores the current user, it's initialized with a default value so the signin modal is not automatically displayed when refreshing and then deleted if a valid user's token is found (this causes flickering)
  const [user, setUser] = useState<string | null>("someone");
  const [isLoginMode, setIsLoginMode] = useState<boolean>(true);
  // Use state to store the list of pokemon corresponding to the page's number
  const [list, setList] = useState<Pokemon[]>([]);
  // Use state to get the total amount of pages based on the amount of pokemon in the database
  const [pageAmount, setPageAmount] = useState(1);
  // Stores the page in a use state too, so we can trigger functionality based on the modification of the page number
  const [page, setPage] = useState<number>(1);
  // Stores the type tags when completing the form to add a new pokemon
  const [tagList, setTagList] = useState<Array<string>>([]);
  // Use states for error messages, had to made them individual cause' had trouble trying to put them all in a array useState
  const [idError, setIdError] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [typesError, setTypesError] = useState<string>("");

  useEffect(() => {
    setToken(cookies.get("jwt_authorization"));
    if (!user) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [cookies]);

  // useEffect to check if there is any existing token (in a cookie of course) that we can use to validate the user, this way when the page is refreshed they don't have to sign in again
  useEffect(() => {
    if (cookies) {
      checkAuth();
    }
    if (!user) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [token]);

  // Fetch to the server's non-params GET method to get the amount of pages and stores then in the pageAmount's useEffect
  useEffect(() => {
    try {
      fetch(`${BASE_URL}api/pokemon/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setPageAmount(data));
    } catch {
      return;
    }
    getPageFromServer(page);
  }, [page, token]);

  // Check if the value that is passed as parameter is between the range of pages, in which case updates the page useState
  const updatePokemonList = (pageIndex: number) => {
    if (pageIndex > 0 && pageIndex <= pageAmount) {
      setPage(pageIndex);
    }
  };

  const checkAuth = async () => {
    try {
      // Checks if there is any jwt in the cookies
      const cookieToken = cookies.get("jwt_authorization");
      // Immediately set isLogged to false if there is no token
      if (!cookieToken) {
        // Fire a message indicating that the session has expired only if there is an actual user. This means that the message only will be shown if there was a user logged but the session expired.
        if (user) {
          fireAlert("Your session has expired!", "error");
        }
        setUser(null);
        // setToken(cookieToken);
        return;
      }
      // If there is a token, then tries to validate it in the backend
      try {
        fetch(`${BASE_URL}auth/validate`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((user) => {
            if (user.email) setUser(user.email);
            setToken(cookieToken);
            fireAlert(`Logged as ${user.email}`);
          });
      } catch {
        throw new Error();
      }
    } catch {
      setUser(null);
    }
  };

  const getPageFromServer = (page: number) => {
    fetch(`${BASE_URL}api/pokemon/${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      });
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

    fetch(`${BASE_URL}api/pokemon`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
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
          // Updates the page
          getPageFromServer(page);
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

  // Deletes the passed pokemon and updates the page
  const deletePokemon = async (pokemon: Pokemon) => {
    fetch(`${BASE_URL}api/pokemon/${pokemon.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    getPageFromServer(page);
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
    tag = capitalizeFirstLetter(tag.toLocaleLowerCase());
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

  const changeMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  const AuthenticationComponent = () => {
    if (isLoginMode) {
      return (
        <Signin
          setUser={setUser}
          url={`${BASE_URL}auth/signin`}
          mode={isLoginMode}
          changeMode={changeMode}
          textContents={{
            title: "Welcome back!",
            link: "Register",
            footer: "Don't have an account? ",
            button: "Sign In",
            error: "Wrong email or password",
          }}
        />
      );
    } else {
      return (
        <Signin
          setUser={setUser}
          url={`${BASE_URL}auth/signup`}
          mode={isLoginMode}
          changeMode={changeMode}
          textContents={{
            title: "Welcome to the pokedex!",
            link: "Sign in",
            footer: "Already have an account? ",
            button: "Register",
            error: "This email is already in use",
          }}
        />
      );
    }
  };

  return (
    <div>
      {user ? <></> : <AuthenticationComponent />}
      <header className="relative h-40 flex justify-center items-center bg-black bg-opacity-70">
        <h1 className="flex text-8xl text-yellow-400 font-extrabold bot z-40 drop-shadow-2xl">
          P
          <span className="text-7xl flex flex-col justify-end text-red-600">
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
        <button className="text-4xl absolute right-5 bottom-3 hover:scale-105" onClick={() => setUser(null)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="#d1d1d1"
              stroke-linecap="round"
              stroke-width="1.5"
            >
              <path stroke-linejoin="round" d="M10 12h10m0 0l-3-3m3 3l-3 3" />
              <path d="M4 12a8 8 0 0 1 8-8m0 16a7.985 7.985 0 0 1-6.245-3" />
            </g>
          </svg>
        </button>
      </header>
      <main className="container min-w-full px-20 pt-10 flex flex-col pb-20 ">
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
          {list.length > 0
            ? list.map((pokemon) => (
                <PokemonLi
                  key={pokemon.id}
                  pokemon={pokemon}
                  bgColor={getPokemonColor(pokemon as Pokemon)}
                  deletePokemon={deletePokemon}
                />
              ))
            : ""}
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
