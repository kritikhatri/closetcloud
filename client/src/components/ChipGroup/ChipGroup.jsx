import { useId } from 'react'
import styles from './ChipGroup.module.css'

/*
  A row of pill-shaped choices. Under the hood these are real radio
  buttons (pick one) or checkboxes (pick many), visually restyled — so
  keyboard and screen-reader support comes for free from the browser.

  Props:
    legend    – the question, e.g. "Category"
    options   – [{ value, label, swatch? }]
    multiple  – true → checkboxes, value is an array
                false → radios, value is a string
    onChange  – called with the new value (string or array)
*/
export default function ChipGroup({
  legend,
  options,
  value,
  onChange,
  multiple = false,
  optional = false,
  error,
}) {
  const name = useId()
  const errorId = error ? `${name}-error` : undefined

  function handleChange(optionValue, checked) {
    if (!multiple) return onChange(optionValue)
    onChange(
      checked
        ? [...value, optionValue]
        : value.filter((existing) => existing !== optionValue),
    )
  }

  return (
    // <fieldset> + <legend> groups the choices under one label for
    // screen readers ("Category, radio group, Tops, 1 of 8").
    <fieldset className={styles.group} aria-describedby={errorId}>
      <legend className={styles.legend}>
        {legend}
        {optional && <span className={styles.optional}> (optional)</span>}
      </legend>

      <div className={styles.chips}>
        {options.map((option) => {
          const checked = multiple
            ? value.includes(option.value)
            : value === option.value
          return (
            <label key={option.value} className={styles.chip}>
              <input
                type={multiple ? 'checkbox' : 'radio'}
                name={name}
                value={option.value}
                checked={checked}
                onChange={(event) => handleChange(option.value, event.target.checked)}
                aria-invalid={error ? true : undefined}
                className={styles.input}
              />
              {option.swatch && (
                <span
                  className={styles.swatch}
                  style={{ background: option.swatch }}
                  aria-hidden="true"
                />
              )}
              {option.label}
            </label>
          )
        })}
      </div>

      {error && (
        <p id={errorId} className={styles.error}>
          {error}
        </p>
      )}
    </fieldset>
  )
}
