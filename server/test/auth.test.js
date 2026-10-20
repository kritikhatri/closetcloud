/*
  Automated tests for sign-up, login, logout and sessions.
  Run with:  npm test   (uses the separate closetcloud_test database)

  Uses Node's built-in test runner (node:test) and fetch, so no extra
  testing libraries are needed. Each test talks to a real copy of the API
  over HTTP, exactly like the browser does.
*/
import assert from 'node:assert/strict'
import { after, before, beforeEach, describe, test } from 'node:test'
import { createApp } from '../src/app.js'
import { prisma } from '../src/lib/prisma.js'

let server
let baseUrl

before(async () => {
  assert.equal(process.env.NODE_ENV, 'test', 'Tests must run with NODE_ENV=test (use npm test)')
  server = createApp().listen(0) // port 0 = any free port
  await new Promise((resolve) => server.once('listening', resolve))
  baseUrl = `http://localhost:${server.address().port}`
})

after(async () => {
  server.close()
  await prisma.$disconnect()
})

// Start every test with an empty database. Sessions are removed too,
// because deleting a user cascades to their sessions.
beforeEach(async () => {
  await prisma.user.deleteMany()
})

/* Small helper: sends JSON, returns { status, body, cookie }. */
async function api(path, { method = 'GET', body, cookie, origin } = {}) {
  const res = await fetch(baseUrl + path, {
    method,
    headers: {
      ...(body && { 'Content-Type': 'application/json' }),
      ...(cookie && { Cookie: cookie }),
      ...(origin && { Origin: origin }),
    },
    body: body && JSON.stringify(body),
  })
  const setCookie = res.headers.getSetCookie().find((c) => c.startsWith('cc_session='))
  const text = await res.text()
  return {
    status: res.status,
    body: text ? JSON.parse(text) : null,
    setCookie,
    cookie: setCookie?.split(';')[0], // just "cc_session=<token>"
  }
}

const alice = { name: 'Alice', email: 'Alice@Example.com', password: 'correct horse battery' }

describe('sign up', () => {
  test('creates an account, logs in, and never returns the password hash', async () => {
    const res = await api('/api/auth/signup', { method: 'POST', body: alice })
    assert.equal(res.status, 201)
    assert.equal(res.body.user.email, 'alice@example.com') // lowercased
    assert.equal(res.body.user.name, 'Alice')
    assert.equal('passwordHash' in res.body.user, false)
    assert.match(res.setCookie, /HttpOnly/i)
    assert.match(res.setCookie, /SameSite=Lax/i)
  })

  test('stores a scrypt hash, not the password', async () => {
    await api('/api/auth/signup', { method: 'POST', body: alice })
    const row = await prisma.user.findUnique({ where: { email: 'alice@example.com' } })
    assert.notEqual(row.passwordHash, alice.password)
    assert.match(row.passwordHash, /^scrypt\$/)
  })

  test('rejects a duplicate email, ignoring capital letters', async () => {
    await api('/api/auth/signup', { method: 'POST', body: alice })
    const res = await api('/api/auth/signup', {
      method: 'POST',
      body: { ...alice, email: 'ALICE@example.COM' },
    })
    assert.equal(res.status, 409)
    assert.ok(res.body.error.fields.email)
  })

  test('validates every field and reports each problem', async () => {
    const res = await api('/api/auth/signup', {
      method: 'POST',
      body: { name: '  ', email: 'not-an-email', password: 'short' },
    })
    assert.equal(res.status, 400)
    assert.deepEqual(Object.keys(res.body.error.fields).sort(), ['email', 'name', 'password'])
  })
})

describe('log in', () => {
  beforeEach(async () => {
    await api('/api/auth/signup', { method: 'POST', body: alice })
  })

  test('works with the right password and sets a session cookie', async () => {
    const res = await api('/api/auth/login', {
      method: 'POST',
      body: { email: 'alice@example.com', password: alice.password },
    })
    assert.equal(res.status, 200)
    assert.equal(res.body.user.name, 'Alice')
    assert.ok(res.cookie)
  })

  test('gives the same answer for a wrong password and an unknown email', async () => {
    const wrongPassword = await api('/api/auth/login', {
      method: 'POST',
      body: { email: 'alice@example.com', password: 'nope nope nope' },
    })
    const unknownEmail = await api('/api/auth/login', {
      method: 'POST',
      body: { email: 'nobody@example.com', password: 'nope nope nope' },
    })
    assert.equal(wrongPassword.status, 401)
    assert.equal(unknownEmail.status, 401)
    assert.deepEqual(wrongPassword.body, unknownEmail.body)
    assert.equal(wrongPassword.cookie, undefined)
  })
})

describe('sessions', () => {
  test('/me returns the user with a valid cookie and 401 without one', async () => {
    const { cookie } = await api('/api/auth/signup', { method: 'POST', body: alice })

    const withCookie = await api('/api/auth/me', { cookie })
    assert.equal(withCookie.status, 200)
    assert.equal(withCookie.body.user.email, 'alice@example.com')

    const without = await api('/api/auth/me')
    assert.equal(without.status, 401)
  })

  test('a made-up token is rejected', async () => {
    const res = await api('/api/auth/me', { cookie: 'cc_session=made-up-token' })
    assert.equal(res.status, 401)
  })

  test('logout deletes the session so the old cookie stops working', async () => {
    const { cookie } = await api('/api/auth/signup', { method: 'POST', body: alice })

    const logout = await api('/api/auth/logout', { method: 'POST', cookie })
    assert.equal(logout.status, 204)
    assert.equal(await prisma.session.count(), 0)

    const me = await api('/api/auth/me', { cookie })
    assert.equal(me.status, 401)
  })

  test('an expired session is rejected and removed', async () => {
    const { cookie } = await api('/api/auth/signup', { method: 'POST', body: alice })
    await prisma.session.updateMany({ data: { expiresAt: new Date(Date.now() - 1000) } })

    const me = await api('/api/auth/me', { cookie })
    assert.equal(me.status, 401)
    assert.equal(await prisma.session.count(), 0)
  })

  test('a session close to expiry is extended (sliding expiry)', async () => {
    const { cookie } = await api('/api/auth/signup', { method: 'POST', body: alice })
    const soon = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 days left
    await prisma.session.updateMany({ data: { expiresAt: soon } })

    const me = await api('/api/auth/me', { cookie })
    assert.equal(me.status, 200)
    assert.ok(me.setCookie, 'expected a refreshed cookie')
    const session = await prisma.session.findFirst()
    assert.ok(session.expiresAt > new Date(Date.now() + 25 * 24 * 60 * 60 * 1000))
  })
})

describe('request safety', () => {
  test('blocks data-changing requests from other websites', async () => {
    const res = await api('/api/auth/signup', {
      method: 'POST',
      body: alice,
      origin: 'https://evil.example',
    })
    assert.equal(res.status, 403)
    assert.equal(await prisma.user.count(), 0)
  })

  test('allows requests from the ClosetCloud app origin', async () => {
    const res = await api('/api/auth/signup', {
      method: 'POST',
      body: alice,
      origin: process.env.CLIENT_ORIGIN,
    })
    assert.equal(res.status, 201)
  })

  test('returns JSON errors for malformed bodies and unknown routes', async () => {
    const bad = await fetch(`${baseUrl}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{oops',
    })
    assert.equal(bad.status, 400)
    assert.ok((await bad.json()).error.message)

    const missing = await api('/api/nothing-here')
    assert.equal(missing.status, 404)
  })
})
