import { HttpError } from '../utils/HttpError.js'

/* Any /api URL that no route matched. */
export function notFound(req, res, next) {
  next(new HttpError(404, `No API route for ${req.method} ${req.originalUrl}`))
}

/*
  The one place errors become responses. Express 5 sends any error thrown
  in a route (including inside async functions) here, so routes don't
  need try/catch blocks.

  Every error response has the same shape:
    { "error": { "message": "...", "fields": { ... } } }
*/
// Express recognises error handlers by their four parameters, so `next`
// must stay in the signature even though it isn't used.
export function errorHandler(err, req, res, next) {
  let status = 500
  let message = 'Something went wrong on our side. Please try again.'
  let fields

  if (err instanceof HttpError) {
    status = err.status
    message = err.message
    fields = err.fields
  } else if (err.type === 'entity.parse.failed') {
    // express.json() couldn't parse the request body.
    status = 400
    message = 'The request body is not valid JSON.'
  } else if (err.type === 'entity.too.large') {
    status = 413
    message = 'The request is too large.'
  } else if (err.code === 'P2002') {
    // Prisma: a unique constraint failed (e.g. two sign-ups racing with the
    // same email at the same moment).
    status = 409
    message = 'That already exists.'
  }

  // Unexpected errors are logged in full for us, but the browser only gets
  // the generic message: stack traces can leak details about the server.
  if (status >= 500) console.error(err)

  res.status(status).json({ error: { message, ...(fields && { fields }) } })
}
