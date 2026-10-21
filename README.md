# ClosetCloud

A personal digital wardrobe and outfit planner: upload your clothes, build outfits, plan what to wear, and find new ways to style what you already own.

> 🚧 Work in progress, built phase by phase. Full architecture notes, screenshots and deployment steps will be added as features land.

## Tech stack

- **Frontend:** React 19 + Vite, React Router, CSS Modules
- **Backend:** Node.js 22, Express 5, REST API, zod validation
- **Database:** PostgreSQL with Prisma 7
- **Auth:** server-side sessions in PostgreSQL, httpOnly cookies, scrypt password hashing

## Project structure

```
closetcloud/
├── client/   React app (Vite) on http://localhost:5180
└── server/   Express API on http://localhost:4000
```

In development, Vite forwards every `/api/...` request to the Express server, so the browser sees a single site and the login cookie works without any cross-site setup.

## Running locally

You need **Node.js 22.18+** and **PostgreSQL** running locally.

### 1. Database

```bash
createdb closetcloud        # the app's database
createdb closetcloud_test   # a separate one for automated tests
```

### 2. API server

```bash
cd server
cp .env.example .env              # then edit DATABASE_URL for your machine
cp .env.test.example .env.test    # same, pointing at closetcloud_test
npm install                       # also generates the Prisma client
npm run db:migrate                # creates the tables
npm run dev                       # optional: API only, http://localhost:4000
```

### 3. Start everything

From the main `closetcloud` folder, one command starts **both** the API and the website:

```bash
npm install          # first time only (installs the tool that runs both)
npm run dev          # API on :4000 + website on :5180
```

Open http://localhost:5180. Both servers must be running: if the API is off, sign-up and login show "The ClosetCloud API isn't running".

(You can also run them separately: `npm run dev` inside `server/` and inside `client/`, in two terminals.)

## API

All responses are JSON. Errors always look like:

```json
{ "error": { "message": "Please fix the highlighted fields.", "fields": { "email": "Enter a valid email address." } } }
```

| Method | Route | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | – | Server status |
| POST | `/api/auth/signup` | – | `{ name, email, password }` → `201 { user }` and session cookie |
| POST | `/api/auth/login` | – | `{ email, password }` → `200 { user }` and session cookie |
| POST | `/api/auth/logout` | – | Ends the session → `204` |
| GET | `/api/auth/me` | ✔ | The logged-in user, or `401` |

Try it with curl (the `-c`/`-b` flags save and send the cookie):

```bash
curl -c jar.txt -X POST localhost:4000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada","email":"ada@example.com","password":"a long password"}'
curl -b jar.txt localhost:4000/api/auth/me
```

## Security notes

- Passwords are hashed with **scrypt** (salted, memory-hard); the plain password is never stored.
- The session cookie is **httpOnly** (JavaScript can't read it) and **SameSite=Lax**; only a SHA-256 hash of the session token is stored in the database.
- Data-changing requests from other origins are rejected (CSRF protection), and login/sign-up are **rate-limited**.
- Login gives the same response for "unknown email" and "wrong password", with equal timing, so it doesn't reveal who has an account.
- All input is validated on the server with zod, whatever the browser sends.

## Tests

```bash
cd server
npm test     # 14 API tests against the closetcloud_test database
```

## Progress

- [x] Phase 1: Environment setup
- [x] Phase 2: Design system (tokens, typography, buttons)
- [x] Phase 3: App shell and navigation
- [x] Phase 4: Wardrobe UI (still stored in the browser, per account, until Phase 7)
- [x] Phase 5: Backend and database (Express, PostgreSQL, Prisma)
- [x] Phase 6: Authentication (sign up, log in, log out, protected pages)
- [ ] Phase 7: Wardrobe CRUD via the API, with image uploads
- [ ] Phase 8: Outfit builder
- [ ] Phase 9: Calendar and inspiration saving
- [ ] Phase 10: Polish, deployment and full documentation

Inspiration photography from [Unsplash](https://unsplash.com/), credited on every look.
