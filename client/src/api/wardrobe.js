import { validateItem } from '../utils/validateItem.js'

/*
  Wardrobe API — TEMPORARY local version.

  Pages never touch storage directly; they only call these async
  functions. Right now they read and write the browser's localStorage.
  In Phase 7 this file is rewritten to call the real Express server with
  fetch(), and because the function names and return values stay the
  same, no page or component has to change.

  Limitations of the local version (all fixed by the real backend):
    • data lives only in this browser — not shared across devices
    • localStorage holds roughly 5 MB, so about 30–50 photos
    • there's no account, so anyone using this browser sees the closet
*/

const STORAGE_KEY = 'closetcloud:wardrobe:v1'

/* An error that remembers an HTTP-style status code, so pages can tell
   "not found" (404) apart from "invalid input" (400). The real API in
   Phase 7 will throw the same kind of error. */
export class ApiError extends Error {
  constructor(message, status, fieldErrors) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.fieldErrors = fieldErrors
  }
}

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch (error) {
    console.error('Could not read wardrobe from localStorage', error)
    return []
  }
}

function writeAll(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    // The most likely cause is the ~5 MB storage limit.
    console.error('Could not save wardrobe to localStorage', error)
    throw new ApiError(
      'Your browser’s storage is full. Remove a few pieces and try again.',
      507,
    )
  }
}

// A short pause, so loading states behave the way they will with a real
// network request instead of finishing instantly.
const networkDelay = () => new Promise((resolve) => setTimeout(resolve, 250))

function findIndexOrThrow(items, id) {
  const index = items.findIndex((item) => item.id === id)
  if (index === -1) throw new ApiError('This piece couldn’t be found.', 404)
  return index
}

function validateOrThrow(input) {
  const { values, errors } = validateItem(input)
  if (Object.keys(errors).length > 0) {
    throw new ApiError('Please fix the highlighted fields.', 400, errors)
  }
  return values
}

/** All items, newest first. */
export async function listItems() {
  await networkDelay()
  return readAll().sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function getItem(id) {
  await networkDelay()
  const items = readAll()
  return items[findIndexOrThrow(items, id)]
}

export async function createItem(input) {
  await networkDelay()
  const values = validateOrThrow(input)
  const now = new Date().toISOString()
  const item = { id: crypto.randomUUID(), ...values, createdAt: now, updatedAt: now }
  writeAll([...readAll(), item])
  return item
}

export async function updateItem(id, input) {
  await networkDelay()
  const values = validateOrThrow(input)
  const items = readAll()
  const index = findIndexOrThrow(items, id)
  const updated = { ...items[index], ...values, updatedAt: new Date().toISOString() }
  items[index] = updated
  writeAll(items)
  return updated
}

export async function deleteItem(id) {
  await networkDelay()
  const items = readAll()
  findIndexOrThrow(items, id)
  writeAll(items.filter((item) => item.id !== id))
}
