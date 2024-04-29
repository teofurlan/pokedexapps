import { authenticateUser } from "@/services/users"
import { redirect } from "next/navigation"

export default async function Login() {
  const login = async (data: FormData) => {
    'use server'
    const email = data.get('email') as string
    const password = data.get('password') as string

    await authenticateUser({ email, password })
    redirect('/')
  }

  return (
    <div>
      <h1>Login</h1>
      <form action={login}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}