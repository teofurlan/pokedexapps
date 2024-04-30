import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../utility";
// import { useState } from "react";
import Cookies from "universal-cookie";
import React, { useState } from "react";
import { InputError } from "./InputError";

export default function Signin({ setUser }) {
  const [error, setError] = useState<string>("");
  // Initialize the cookies manager
  const cookies = new Cookies();

  const login = (jwt: string = "") => {
    // Decode the jwt
    const decodedJwt = jwtDecode(jwt);
    // Updates the user state
    setUser((decodedJwt as { email: string }).email);
    // Set cookie and converts the expiration time from the jwt (in milliseconds) to seconds
    cookies.set("jwt_authorization", jwt, {
      expires: new Date(decodedJwt.exp * 1000),
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // I pretended that this is not react...
    const form = event.currentTarget;
    // Get the information of the form
    const data = new FormData(form);
    try {
      data.forEach((value) => {
        if (value === "") {
          setError("Both fields are required");
          throw new Error();
        }
      });
    } catch {
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}auth/signin`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: data.get("email"),
          password: data.get("pass"),
        }),
      });
      if (response.ok) {
        const data = await response.json();
        login(data.access_token);
        setUser(data.email);
      } else if (response.status == 403) {
        setError("Wrong user or password");
      }
      if (response.status == 400) {
        setError("Invalid email format");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed bg-black bg-opacity-70 w-full h-full z-50 flex items-center justify-center">
      <div>
        <img
          src="../public/pikachu_waving.png"
          alt="Hey!"
          className="size-20 ml-5"
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center min-w-96 bg-stone-200 px-5 py-10 rounded-sm"
        >
          <h2 className="text-xl mb-5">Welcome to the Pokedex!</h2>
          {error && <InputError error={error} />}
          <div className="flex flex-col my-0.5 w-full">
            <input
              type="email"
              name="email"
              placeholder="Type your email"
              onInvalid={(e) => {
                e.preventDefault();
                setError("Invalid email format");
              }}
              className="w-full h-10 p-3 bg-gray-300 placeholder:text-gray-700"
            />
          </div>
          <div className="flex flex-col my-0.5 w-full">
            <input
              type="password"
              name="pass"
              placeholder="Password"
              className="w-full h-10 p-3 bg-gray-300 placeholder:text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 py-2 px-3 m-2 rounded-sm"
          >
            Sign In
          </button>
          <p>
            Looking to{" "}
            <a href="" className="text-blue-500">
              create an account
            </a>
            ?
          </p>
        </form>
      </div>
    </div>
  );
}
