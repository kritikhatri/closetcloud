import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from 'node:crypto'
import { promisify } from 'node:util'

/*
  Password hashing with scrypt (built into Node, no extra package).

  Why not just store the password? If the database ever leaked, every
  account would be exposed. A hash is one-way: you can check a password
  against it, but you can't turn it back into the password.

  Why scrypt and not a fast hash like SHA-256? Fast hashes let an attacker
  try billions of guesses per second. scrypt is deliberately slow and
  memory-hungry, so each guess is expensive. (OWASP recommends Argon2id
  first and scrypt as a strong alternative.)

  A random "salt" is mixed in per password, so two people with the same
  password get completely different hashes.

  Stored format:  scrypt$N$r$p$<salt base64>$<hash base64>
  Keeping the settings inside the string means we can raise them later and
  still verify old hashes.
*/
const scrypt = promisify(scryptCallback)

const SETTINGS = { N: 2 ** 16, r: 8, p: 2 } // ~64 MiB of memory per hash
const KEY_LENGTH = 64
const SALT_BYTES = 16
const MAX_MEMORY = 256 * 1024 * 1024 // Node's safety cap must exceed what scrypt uses

// NFKC makes visually identical characters (e.g. different "é" encodings)
// hash the same, so a password typed on a phone matches one typed on a laptop.
const normalize = (password) => password.normalize('NFKC')

export async function hashPassword(password) {
  const salt = randomBytes(SALT_BYTES)
  const key = await scrypt(normalize(password), salt, KEY_LENGTH, {
    ...SETTINGS,
    maxmem: MAX_MEMORY,
  })
  const { N, r, p } = SETTINGS
  return ['scrypt', N, r, p, salt.toString('base64'), key.toString('base64')].join('$')
}

export async function verifyPassword(password, stored) {
  const [algorithm, N, r, p, saltB64, keyB64] = stored.split('$')
  if (algorithm !== 'scrypt') return false

  const expected = Buffer.from(keyB64, 'base64')
  const actual = await scrypt(normalize(password), Buffer.from(saltB64, 'base64'), expected.length, {
    N: Number(N),
    r: Number(r),
    p: Number(p),
    maxmem: MAX_MEMORY,
  })
  // timingSafeEqual takes the same time whether the first byte or the last
  // byte differs, so response timing can't leak how "close" a guess was.
  return timingSafeEqual(actual, expected)
}

/*
  When someone logs in with an email that doesn't exist, we still run a
  full hash check against this throwaway hash. Otherwise "unknown email"
  would answer instantly and "wrong password" slowly, and an attacker
  could time the responses to discover which emails have accounts.
*/
let dummyHashPromise
export function getDummyHash() {
  dummyHashPromise ??= hashPassword(randomBytes(16).toString('hex'))
  return dummyHashPromise
}
