import { useEffect, useId, useRef } from 'react'
import Button from '../Button/Button.jsx'
import styles from './ConfirmDialog.module.css'

/*
  "Are you sure?" pop-up for destructive actions.

  It uses the browser's built-in <dialog> element. showModal() gives us,
  for free: a dimmed backdrop, focus kept inside the dialog, the rest of
  the page made inert, and Escape to close.

  The parent controls it with `open`; we sync that to the real element.
*/
export default function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel = 'Delete',
  busy = false,
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      // Escape fires "cancel". We stop the browser closing it on its own
      // so React state stays the single source of truth.
      onCancel={(event) => {
        event.preventDefault()
        if (!busy) onCancel()
      }}
      // A click on the dimmed backdrop lands on the <dialog> itself.
      onClick={(event) => {
        if (event.target === dialogRef.current && !busy) onCancel()
      }}
    >
      <div className={styles.body}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        <div className={styles.text}>{children}</div>
        <div className={styles.actions}>
          {/* showModal() focuses the first button. Cancel comes first, so
              pressing Enter by reflex never deletes anything. */}
          <Button variant="secondary" onClick={onCancel} disabled={busy}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} disabled={busy}>
            {busy ? 'Deleting…' : confirmLabel}
          </Button>
        </div>
      </div>
    </dialog>
  )
}
