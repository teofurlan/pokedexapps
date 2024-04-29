'use client'
import { addPokemon, deletePokemon, getPokemonList, type Pokemon } from "@/services/pokemon"
import { useEffect, useState } from "react"
import PokemonForm from "./components/PokemonForm"

const BASE_URL = 'http://localhost:3000'

type AppProps = {
  list: Pokemon[]
  count: number
}

export default function App(props: AppProps) {
  const [list, setList] = useState<Pokemon[]>(props.list)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(props.count)
  const pageCount = Math.ceil(count / 5)

  useEffect(() => {
    let cancelled = false
    getPokemonList(page)
      .then((data) => {
        if (!cancelled) {
          setList(data.list)
          setCount(data.count)
        }
      })

    return () => {
      cancelled = true
    }
  }, [page])

  async function handleAddPokemon(event: React.FormEvent<HTMLFormElement>) {
    const form = event.currentTarget
    const data = new FormData(form)
    const pokemon = {
      id: parseInt(data.get('id') as string),
      name: data.get('name') as string
    }

    await addPokemon(pokemon)

    if (page === pageCount && list.length < 5) {
      setList(current => [...current, pokemon])
    }
    setCount(current => current + 1)
  }

  async function handleDeletePokemon(id: number) {
    deletePokemon(id)

    setList(current => current.filter(pokemon => pokemon.id !== id))
    setCount(current => current - 1)

    if (page >= pageCount && list.length === 1 && page > 1) {
      setPage(page - 1)
    }
  }

  return (
    <>
      <h1 className="text-5xl text-red-600 font-extrabold text-center">Pokedex</h1>
      <PokemonForm handleAddPokemon={handleAddPokemon} />
      <ul className="mt-4 border-4 border-red-700">
        <li className="flex items-center justify-between border-b border-gray-300 p-2 bg-red-700">
          <span className="text-lg text-white font-extrabold w-1/3">ID</span>
          <span className="text-lg text-white font-extrabold w-1/3 text-center">Name</span>
          <span className="text-lg text-white font-extrabold w-1/3 text-right">DELETE</span>
        </li>
        {list.map(pokemon => (
          <li key={pokemon.id} className="flex bg-white items-center justify-between border-b border-gray-300 p-2">
            <span className="text-lg text-red-600 font-bold w-1/3">{pokemon.id}</span>
            <span className="text-lg text-red-600 font-bold w-1/3 text-center">{pokemon.name}</span>
            <div className="w-1/3 text-right">
              <button onClick={() => handleDeletePokemon(pokemon.id)} className="font-bold hover:font-extrabold">X</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-2">
        <button onClick={() => setPage(c => Math.max(1, c - 1))} disabled={page === 1} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Prev</button>
        <span className="flex items-center self-stretch">{page}</span>
        <button onClick={() => setPage(c => Math.min(pageCount, c + 1))} disabled={page === pageCount} className="p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 disabled:opacity-50 hover:bg-red-700">Next</button>
      </div>
    </>
  )
}