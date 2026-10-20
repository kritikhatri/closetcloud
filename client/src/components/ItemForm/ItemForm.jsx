import { useEffect, useRef, useState } from 'react'
import {
  CATEGORIES,
  COLORS,
  LIMITS,
  OCCASIONS,
  SEASONS,
} from '../../constants/wardrobe.js'
import { validateItem } from '../../utils/validateItem.js'
import { ButtonLink } from '../Button/Button.jsx'
import Button from '../Button/Button.jsx'
import ChipGroup from '../ChipGroup/ChipGroup.jsx'
import { TextAreaField, TextField } from '../Field/Field.jsx'
import PhotoInput from '../PhotoInput/PhotoInput.jsx'
import styles from './ItemForm.module.css'

const emptyItem = {
  imageUrl: '',
  name: '',
  category: '',
  color: '',
  seasons: [],
  occasions: [],
  brand: '',
  notes: '',
}

/*
  The add/edit form for a clothing item. Used by both the "Add a piece"
  and "Edit" pages — the only differences are the starting values, the
  button label, and what happens on save (passed in as `onSubmit`).

  This is a "controlled form": every field's value lives in React state
  (`values`), and the inputs simply display it. That makes validation,
  resetting and pre-filling for edits straightforward.
*/
export default function ItemForm({ initialValues, submitLabel, cancelTo, onSubmit }) {
  const [values, setValues] = useState({ ...emptyItem, ...initialValues })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [submitCount, setSubmitCount] = useState(0)
  const formRef = useRef(null)

  // After a failed submit, move focus to the first field with a problem,
  // so keyboard and screen-reader users land right where they need to be.
  useEffect(() => {
    if (submitCount === 0) return
    formRef.current?.querySelector('[aria-invalid="true"]')?.focus()
  }, [submitCount])

  // Returns a change handler for one field, and clears that field's error
  // as soon as the user starts fixing it.
  function setField(name) {
    return (value) => {
      setValues((current) => ({ ...current, [name]: value }))
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault() // stop the browser's default full-page form submit
    setFormError('')

    const { values: cleaned, errors: found } = validateItem(values)
    if (Object.keys(found).length > 0) {
      setErrors(found)
      setSubmitCount((n) => n + 1)
      return
    }

    setIsSaving(true)
    try {
      await onSubmit(cleaned)
      // On success the page navigates away, so there's nothing to reset.
    } catch (error) {
      // Field errors from the API (the server re-validates) go next to the
      // fields; anything else is shown at the top of the form.
      if (error.fieldErrors) {
        setErrors(error.fieldErrors)
        setSubmitCount((n) => n + 1)
      }
      setFormError(error.message || 'Something went wrong. Please try again.')
      setIsSaving(false)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className={styles.form}>
      {/* noValidate: we show our own friendly messages instead of the
          browser's built-in validation bubbles. */}

      <div className={styles.photoColumn}>
        <PhotoInput
          value={values.imageUrl}
          onChange={setField('imageUrl')}
          error={errors.imageUrl}
        />
      </div>

      <div className={styles.fields}>
        {formError && (
          <p className={styles.formError} role="alert">
            {formError}
          </p>
        )}

        <TextField
          label="Name"
          name="name"
          value={values.name}
          onChange={(event) => setField('name')(event.target.value)}
          error={errors.name}
          maxLength={LIMITS.name}
          placeholder="e.g. Ivory linen shirt"
          autoComplete="off"
        />

        <ChipGroup
          legend="Category"
          options={CATEGORIES}
          value={values.category}
          onChange={setField('category')}
          error={errors.category}
        />

        <ChipGroup
          legend="Main colour"
          options={COLORS}
          value={values.color}
          onChange={setField('color')}
          error={errors.color}
        />

        <ChipGroup
          legend="Seasons"
          optional
          multiple
          options={SEASONS}
          value={values.seasons}
          onChange={setField('seasons')}
          error={errors.seasons}
        />

        <ChipGroup
          legend="Occasions"
          optional
          multiple
          options={OCCASIONS}
          value={values.occasions}
          onChange={setField('occasions')}
          error={errors.occasions}
        />

        <TextField
          label="Brand"
          optional
          name="brand"
          value={values.brand}
          onChange={(event) => setField('brand')(event.target.value)}
          error={errors.brand}
          maxLength={LIMITS.brand}
          autoComplete="off"
        />

        <TextAreaField
          label="Notes"
          optional
          name="notes"
          value={values.notes}
          onChange={(event) => setField('notes')(event.target.value)}
          error={errors.notes}
          maxLength={LIMITS.notes}
          hint={`Fit, fabric, care instructions… (${values.notes.length}/${LIMITS.notes})`}
        />

        <div className={styles.actions}>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving…' : submitLabel}
          </Button>
          <ButtonLink to={cancelTo} variant="ghost">
            Cancel
          </ButtonLink>
        </div>
      </div>
    </form>
  )
}
