// import { useEffect, useState } from "react"

import { useEffect } from "react";

// type Pokemon = {
//   id: number
//   name: string
// }

const BASE_URL = "http://localhost:4321/";

export default function App() {
  // const [list, setList] = useState<Pokemon[]>([])
  // const [page, setPage] = useState(1)
  // const [count, setCount] = useState(0)
  // const pageCount = Math.ceil(count / 5)
  useEffect(() => {
    console.log(BASE_URL);
    fetch(BASE_URL)
      .then((res) => res.text())
      .then((data) => console.log(data));
  });
  // useEffect(() => {
  //   let cancelled = false
  //   fetch(`${BASE_URL}/pokemon.json?page=${page}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (!cancelled) {
  //         setList(data.list)
  //         setCount(data.count)
  //       }
  //     })

  //   return () => {
  //     cancelled = true
  //   }
  // }, [page])

  // async function addPokemon(event: React.FormEvent<HTMLFormElement>) {
  //   event.preventDefault()

  //   const form = event.currentTarget
  //   const data = new FormData(form)
  //   const pokemon = {
  //     id: parseInt(data.get('id') as string),
  //     name: data.get('name') as string
  //   }

  //   await fetch(`${BASE_URL}/pokemon.json`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(pokemon)
  //   })

  //   form.reset()
  //   if (page === pageCount && list.length < 5) {
  //     setList(current => [...current, pokemon])
  //   }
  //   setCount(current => current + 1)
  // }

  // async function deletePokemon(id: number) {
  //   await fetch(`${BASE_URL}/pokemon/${id}.json`, {
  //     method: 'DELETE'
  //   })

  //   setList(current => current.filter(pokemon => pokemon.id !== id))
  //   setCount(current => current - 1)

  //   if (page >= pageCount) {
  //     setPage(page - 1)
  //   }
  // }

  // return (
  //   <main className="container mx-auto flex flex-col">
  // 	<h1 className="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
  // 	<form action="/api/pokemon" method="post" onSubmit={addPokemon}>
  // 		<h2 className="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
  // 		<input type="number" name="id" placeholder="ID" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
  // 		<input type="text" name="name" placeholder="Name" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
  // 		<button type="submit" className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>
  // 	</form>
  // 	<ul className="mt-4 border-4 border-red-700">
  // 		<li className="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700">
  // 			<span className="text-lg text-white font-extrabold w-1/3">ID</span>
  // 			<span className="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
  // 			<span className="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
  // 		</li>
  // 		{list.map(pokemon => (
  // 			<li className="flex items-center justify-between border-b border-gray-300 p-2">
  // 				<span className="text-lg text-red-600 font-bold w-1/3">{pokemon.id}</span>
  // 				<span className="text-lg text-red-600 font-bold w-1/3 text-center">{pokemon.name}</span>
  // 				<div className="w-1/3 text-right">
  // 					<button onClick={() => deletePokemon(pokemon.id)} className="font-bold hover:font-extrabold">X</button>
  // 				</div>
  // 			</li>
  // 		))}
  // 	</ul>
  //   <div className="flex justify-center gap-2">
  //     <button onClick={() => setPage(c => Math.max(1, c - 1))} disabled={page === 1} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
  //     <span className="flex items-center self-stretch">{page}</span>
  //     <button onClick={() => setPage(c => Math.min(pageCount, c + 1))} disabled={page === pageCount} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
  //   </div>
  // </main>
  // )


  
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
      <main></main>
    </div>
  );
}
