import { HttpError } from './HttpError.js'

/*
  Checks `data` against a zod schema. Returns the cleaned data (trimmed,
  lowercased, etc.) or throws a 400 HttpError listing the first problem
  with each field:  { email: 'Enter a valid email address.' }
*/
export function validate(schema, data) {
  const result = schema.safeParse(data ?? {})
  if (result.success) return result.data

  const fields = {}
  for (const issue of result.error.issues) {
    const field = issue.path.join('.') || 'form'
    fields[field] ??= issue.message
  }
  throw new HttpError(400, 'Please fix the highlighted fields.', fields)
}
