import { z } from 'zod'

/*
  Rules for sign-up and login data. The server checks these on every
  request even though the React forms check too: anyone can send requests
  straight to the API (with curl, for example) and skip the browser.
*/

const email = z
  .string({ error: 'Enter your email address.' })
  .trim()
  .toLowerCase() // one account per address, whatever capitals are used
  .max(254, { error: 'That email address is too long.' })
  .pipe(z.email({ error: 'Enter a valid email address.' }))

export const signupSchema = z.object({
  name: z
    .string({ error: 'Enter your name.' })
    .trim()
    .min(1, { error: 'Enter your name.' })
    .max(60, { error: 'Keep your name under 60 characters.' }),
  email,
  password: z
    .string({ error: 'Choose a password.' })
    .min(8, { error: 'Use at least 8 characters.' })
    // An upper limit stops someone sending a 10 MB "password" to make the
    // server spend ages hashing it.
    .max(128, { error: 'Keep your password under 128 characters.' }),
})

export const loginSchema = z.object({
  email,
  password: z
    .string({ error: 'Enter your password.' })
    .min(1, { error: 'Enter your password.' })
    .max(128, { error: 'Email or password is incorrect.' }),
})
