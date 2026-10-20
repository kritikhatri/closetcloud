/*
  An error that knows which HTTP status it should become.
  Route code just throws:   throw new HttpError(404, 'Item not found')
  and the central error handler turns it into a JSON response.

  `fields` optionally maps form field names to messages, so the React form
  can show each message next to the right input.
*/
export class HttpError extends Error {
  constructor(status, message, fields) {
    super(message)
    this.name = 'HttpError'
    this.status = status
    this.fields = fields
  }
}
