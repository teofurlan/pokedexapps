import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pokedex from "./Pokedex";
import { Signup } from "./Signup";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Pokedex />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
      </Routes>
    </Router>
  );
}
