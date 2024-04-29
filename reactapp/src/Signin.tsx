import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "./utility";
// import { useState } from "react";
import Cookies from "universal-cookie";
import React, { useState } from "react";

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
    const form = event.currentTarget;
    // Get the information of the form
    const data = new FormData(form);
    console.log(data.get("Email"));
    try {
      const response = await fetch(`${BASE_URL}auth/signin`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          email: data.get("User"),
          password: data.get("Password"),
        }),
      });
      if (response.ok) {
        console.log("You signed in successfully!!!");
        const data = await response.json();
        login(data.access_token);
        setUser(data.email);
      } else if (response.status == 403) {
        setError("Wrong user or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  function FormInput({ children = "", type, name }) {
    return (
      <div className="flex flex-col mt-4 w-full gap-1.5">
        <label htmlFor={type}>{name}</label>
        <input
          type={type}
          name={name}
          placeholder={children}
          className="w-full h-8 p-3 rounded-md"
        />
      </div>
    );
  }

  return (
    <div className="fixed bg-black bg-opacity-70 w-full h-full z-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center min-w-96 bg-red-400 p-10 rounded-md"
      >
        {error && (
          <div
            className="flex items-center bg-red-300 bg-opacity-80 rounded-sm p-1.5 gap-2"
            id="name-error"
          >
            <svg
              className="text-red-600 size-5"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 1024 1024"
            >
              <path
                fill="currentColor"
                d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m0 832a384 384 0 0 0 0-768a384 384 0 0 0 0 768m48-176a48 48 0 1 1-96 0a48 48 0 0 1 96 0m-48-464a32 32 0 0 1 32 32v288a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32"
              />
            </svg>
            <span className="block text-red-500 text-base">{error}</span>
          </div>
        )}
        <FormInput type="email" name={"User"}>
          someone@email.com
        </FormInput>
        <FormInput type="password" name={"Password"}></FormInput>
        <button
          type="submit"
          className="bg-yellow-200 w-fit py-1 px-3 m-2 rounded-lg"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
