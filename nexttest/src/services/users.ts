'use server'
import { cookies } from 'next/headers'

const users = new Map<string, string>()

export async function createUser(user: { email: string, password: string }) {
  if (!user.email || user.email.length < 5 || !user.email.includes('@')) {
    throw new Error('Invalid email')
  }
  if (users.has(user.email)) {
    throw new Error('User already exists')
  }
  if (!user.password || user.password.length < 8) {
    throw new Error('Password too short')
  }

  users.set(user.email, user.password)
}

export async function authenticateUser(user: { email: string, password: string }) {
  const password = users.get(user.email)
  if (!password) {
    throw new Error('User not found')
  }
  if (password !== user.password) {
    throw new Error('Invalid password')
  }
  cookies().set('user', user.email, { httpOnly: true, sameSite: 'strict' })
  return { email: user.email }
}