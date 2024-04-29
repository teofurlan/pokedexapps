type PokemonFormProps = {
  handleAddPokemon: (event: React.FormEvent<HTMLFormElement>) => void
}

export default function PokemonForm({ handleAddPokemon }: PokemonFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleAddPokemon(event)
    event.currentTarget.reset()
  }

  return (
    <form action="/api/pokemon" method="post" onSubmit={handleSubmit}>
      <h2 className="text-2xl text-red-700 font-bold">Agregar nuevo pokemon</h2>
      <input type="number" name="id" placeholder="ID" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
      <input type="text" name="name" placeholder="Name" className="my-1 w-full p-2 border border-gray-300 rounded-lg" />
      <button type="submit" className="w-full p-2 bg-red-600 text-white rounded-lg mt-2 font-bold uppercase duration-200 hover:bg-red-700">Agregar</button>
    </form>
  )
}