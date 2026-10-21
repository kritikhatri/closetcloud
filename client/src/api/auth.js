import { apiFetch } from './client.js'

/*
  Auth API. Each function matches one Express route in
  server/src/routes/auth.js.
*/

export async function signUp({ name, email, password }) {
  const { user } = await apiFetch('/auth/signup', {
    method: 'POST',
    body: { name, email, password },
  })
  return user
}

export async function logIn({ email, password }) {
  const { user } = await apiFetch('/auth/login', { method: 'POST', body: { email, password } })
  return user
}

export async function logOut() {
  await apiFetch('/auth/logout', { method: 'POST' })
}

/* Change your own profile: { name?, styleAesthetics? } → the updated user */
export async function updateProfile(changes) {
  const { user } = await apiFetch('/auth/me', { method: 'PATCH', body: changes })
  return user
}

/* The logged-in user, or null if nobody is logged in. */
export async function getCurrentUser() {
  try {
    const { user } = await apiFetch('/auth/me')
    return user
  } catch (error) {
    if (error.status === 401) return null // not logged in isn't an error here
    throw error
  }
}
