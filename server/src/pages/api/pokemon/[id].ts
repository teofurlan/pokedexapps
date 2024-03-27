import type { APIRoute } from "astro";
import { deletePokemon } from "../../../services/pokemon";

export const POST: APIRoute = async (context) => {
  const id = parseInt(context.params.id!, 10)

  await deletePokemon(id)

  return context.redirect('/')
}