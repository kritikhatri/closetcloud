import { useCallback, useEffect, useRef, useState } from 'react'
import { ToastContext } from '../../context/ToastContext.js'
import styles from './Toast.module.css'

const VISIBLE_MS = 4000

/*
  Shows short confirmation messages ("Added to your closet") at the
  bottom of the screen.

  The message area is an aria-live region: screen readers announce any
  text that appears inside it, without moving the user's focus. It must
  exist on the page *before* the message is added, which is why it's
  always rendered, even when empty.
*/
export default function ToastProvider({ children }) {
  const [message, setMessage] = useState('')
  const timerRef = useRef(null)

  const showToast = useCallback((text) => {
    clearTimeout(timerRef.current)
    setMessage(text)
    timerRef.current = setTimeout(() => setMessage(''), VISIBLE_MS)
  }, [])

  // Cancel a pending timer if the provider ever unmounts.
  useEffect(() => () => clearTimeout(timerRef.current), [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className={styles.region} role="status" aria-live="polite">
        {message && <p className={styles.toast}>{message}</p>}
      </div>
    </ToastContext.Provider>
  )
}
