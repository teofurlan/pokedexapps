import type { APIRoute } from "astro";
import { addPokemon } from "../../../services/pokemon";

export const POST: APIRoute = async (context) => {
  const data = await context.request.formData()

  const id = parseInt(data.get('id') as string)
  const name = data.get('name') as string

  if (!id || !name) {
    return context.redirect('/?error=Invalid%20input')
  }

  const pokemon = { id, name }
  await addPokemon(pokemon)

  return context.redirect('/')
}