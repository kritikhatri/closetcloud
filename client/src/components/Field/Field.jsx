import { useId } from 'react'
import styles from './Field.module.css'

/*
  Labelled text inputs with built-in hint and error messages.

  Accessibility wiring (why the ids matter):
    • <label htmlFor> ↔ <input id>: clicking the label focuses the input,
      and screen readers read the label when the input is focused.
    • aria-describedby points at the hint/error text so it's read too.
    • aria-invalid tells assistive tech the value has a problem.
*/
function useFieldIds(hint, error) {
  const id = useId()
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined
  return { id, hintId, errorId, describedBy }
}

function FieldFrame({ id, label, optional, hint, hintId, error, errorId, children }) {
  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
        {optional && <span className={styles.optional}> (optional)</span>}
      </label>
      {children}
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </div>
  )
}

export function TextField({ label, optional, hint, error, ...inputProps }) {
  const { id, hintId, errorId, describedBy } = useFieldIds(hint, error)
  return (
    <FieldFrame {...{ id, label, optional, hint, hintId, error, errorId }}>
      <input
        id={id}
        className={styles.input}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...inputProps}
      />
    </FieldFrame>
  )
}

/* options: [{ value, label }]. `placeholder` becomes a first option with
   an empty value, e.g. "Any colour". */
export function SelectField({ label, hint, error, options, placeholder, ...selectProps }) {
  const { id, hintId, errorId, describedBy } = useFieldIds(hint, error)
  return (
    <FieldFrame {...{ id, label, hint, hintId, error, errorId }}>
      <select
        id={id}
        className={`${styles.input} ${styles.select}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...selectProps}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldFrame>
  )
}

export function TextAreaField({ label, optional, hint, error, ...textareaProps }) {
  const { id, hintId, errorId, describedBy } = useFieldIds(hint, error)
  return (
    <FieldFrame {...{ id, label, optional, hint, hintId, error, errorId }}>
      <textarea
        id={id}
        className={`${styles.input} ${styles.textarea}`}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...textareaProps}
      />
    </FieldFrame>
  )
}
