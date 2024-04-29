import { createUser } from "@/services/users"
import { redirect } from 'next/navigation'

export default async function SignUp() {
  const signup = async (data: FormData) => {
    'use server'
    const email = data.get('email') as string
    const password = data.get('password') as string

    await createUser({ email, password })
    redirect('/login')
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form action={signup}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}