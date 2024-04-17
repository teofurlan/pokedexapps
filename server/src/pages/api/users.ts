import type { APIRoute } from "astro"
import { createUser } from "../../services/users"

export const POST: APIRoute = async (context) => {
  const data = await context.request.formData()

  const email = data.get('email') as string
  const password = data.get('password') as string

  try {
    await createUser({ email, password })
    return context.redirect('/login')
  } catch (error) {
    return context.redirect('/signup?error=true')
  }

}