import { jwtDecode } from "jwt-decode";
// import { useState } from "react";
import Cookies from "universal-cookie";
import React, { useEffect, useState } from "react";
import { fireAlert } from "../utility";

export default function Signin({
  setUser,
  textContents,
  mode,
  changeMode,
  url,
}) {
  // Initialize the cookies manager
  const cookies = new Cookies();

  const [error, setError] = useState<string>(null);

  useEffect(() => {
    if (error) fireAlert(error, "error");
  }, [error]);

  const login = async (data) => {
    // Decode the jwt
    const decodedJwt = jwtDecode(data.access_token);
    // Updates the user state
    setUser((decodedJwt as { email: string }).email);
    // Set cookie and converts the expiration time from the jwt (in milliseconds) to seconds
    cookies.set("jwt_authorization", data.access_token, {
      expires: new Date(decodedJwt.exp * 1000),
    });
    // Set the email that we got from the endpoint as the current user
    setUser(data.email);
    fireAlert(`Logged as ${data.user}`);
  };

  const register = (data) => {
    if (data.email) {
      fireAlert(`Registered as ${data.email}`);
      changeMode();
      // setAlert({ type: "accepted", text: "Registered successfully" });
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // I pretended that this is not react...
    const form = event.currentTarget;
    // Get the information of the form
    const data = new FormData(form);
    // Check that the form's inputs have values. The reason of this try and catch blocks is to cut the outer function execution if the validation throw's an error (some or both of the input's values is empty)
    try {
      data.forEach((value) => {
        if (value === "") {
          // If not shows an error...
          setError("Both fields are required");
          // ...and cuts the execution
          throw new Error();
        }
      });
    } catch {
      // If some of the fields were empty, stops the execution of handleSubmit
      return;
    }
    const response = await fetch(url, {
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
    // Validate the response from the server
    if (response.ok) {
      const data = await response.json();
      if (mode) {
        login(data);
      } else {
        register(data);
      }
    } else if (response.status == 403) {
      setError(textContents.error);
    }
    if (response.status == 400) {
      // If the server response's status was "Bad request", it's because the the email was malformed, so show an error
      setError("Invalid email format");
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
          id="form"
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center min-w-[22rem] bg-contain px-5 py-10 rounded-sm"
        >
          <h2 className="text-xl font-bold mb-5">{textContents.title}</h2>
          <div className="flex flex-col my-0.5 w-full">
            <input
              type="email"
              name="email"
              placeholder="Email"
              onInvalid={(e) => {
                e.preventDefault();
                setError("Invalid email format");
              }}
              className="w-full h-10 p-3 bg-gray-300 placeholder:text-gray-700 "
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
            {textContents.button}
          </button>
          <p>
            {textContents.footer}
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                changeMode();
              }}
              className="text-blue-500"
            >
              {textContents.link}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
