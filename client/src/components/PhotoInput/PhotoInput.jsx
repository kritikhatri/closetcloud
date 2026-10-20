import { useId, useRef, useState } from 'react'
import { ACCEPTED_IMAGE_TYPES, resizeImage } from '../../utils/resizeImage.js'
import Button from '../Button/Button.jsx'
import Icon from '../Icon/Icon.jsx'
import styles from './PhotoInput.module.css'

/*
  Photo picker with drag-and-drop and a live preview.
  `value` is the current image (a URL or data URL); `onChange` receives
  the resized photo. Resizing happens here so the form only ever sees
  small, ready-to-save images.
*/
export default function PhotoInput({ value, onChange, error }) {
  const id = useId()
  const inputRef = useRef(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [processError, setProcessError] = useState('')

  const shownError = processError || error
  const errorId = shownError ? `${id}-error` : undefined

  async function handleFile(file) {
    if (!file) return
    setProcessError('')
    setIsProcessing(true)
    try {
      onChange(await resizeImage(file))
    } catch (err) {
      setProcessError(err.message)
    } finally {
      setIsProcessing(false)
      // Clear the input so choosing the same file again still fires onChange.
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  function handleDrop(event) {
    event.preventDefault() // stop the browser from opening the file in a new tab
    setIsDragging(false)
    handleFile(event.dataTransfer.files[0])
  }

  const fileInput = (
    <input
      ref={inputRef}
      id={id}
      type="file"
      accept={ACCEPTED_IMAGE_TYPES.join(',')}
      className="visually-hidden"
      aria-labelledby={`${id}-label`}
      aria-describedby={errorId}
      aria-invalid={shownError ? true : undefined}
      onChange={(event) => handleFile(event.target.files[0])}
    />
  )

  return (
    <div className={styles.wrap}>
      <span className={styles.label} id={`${id}-label`}>
        Photo
      </span>

      {value ? (
        <div className={styles.preview}>
          <img src={value} alt="Preview of the selected photo" />
          <div className={styles.previewActions}>
            {fileInput}
            <Button
              variant="secondary"
              size="sm"
              onClick={() => inputRef.current?.click()}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing…' : 'Replace photo'}
            </Button>
          </div>
        </div>
      ) : (
        <label
          htmlFor={id}
          className={`${styles.dropzone} ${isDragging ? styles.dragging : ''} ${
            shownError ? styles.invalid : ''
          }`}
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          {fileInput}
          <span className={styles.dropIcon}>
            <Icon name="plus" size={26} />
          </span>
          <span className={styles.dropTitle}>
            {isProcessing ? 'Processing photo…' : 'Choose a photo'}
          </span>
          <span className={styles.dropHint}>
            or drag one here · JPG, PNG or WebP, up to 10 MB
          </span>
        </label>
      )}

      {shownError && (
        <p id={errorId} className={styles.error}>
          {shownError}
        </p>
      )}
    </div>
  )
}
