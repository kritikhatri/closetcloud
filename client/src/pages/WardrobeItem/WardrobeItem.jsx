import { useCallback, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { deleteItem, getItem } from '../../api/wardrobe.js'
import Button, { ButtonLink } from '../../components/Button/Button.jsx'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import {
  CATEGORIES,
  COLORS,
  OCCASIONS,
  SEASONS,
  labelFor,
} from '../../constants/wardrobe.js'
import useAsyncData from '../../hooks/useAsyncData.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import useToast from '../../hooks/useToast.js'
import styles from './WardrobeItem.module.css'

export default function WardrobeItem() {
  const { id } = useParams()
  const navigate = useNavigate()
  const showToast = useToast()

  const load = useCallback(() => getItem(id), [id])
  const { data: item, error, isLoading } = useAsyncData(load)

  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState('')

  usePageTitle(item?.name ?? 'Piece')

  async function handleDelete() {
    setIsDeleting(true)
    setDeleteError('')
    try {
      await deleteItem(id)
      setConfirmOpen(false)
      showToast(`Removed ${item.name}`)
      navigate('/wardrobe')
    } catch (err) {
      console.error(err)
      setDeleteError(err.message)
      setIsDeleting(false)
    }
  }

  if (isLoading) return <p role="status" className="muted">Loading…</p>

  if (error) {
    return (
      <EmptyState
        icon="hanger"
        title={error.status === 404 ? 'This piece isn’t in your closet' : 'Something went wrong'}
        action={<ButtonLink to="/wardrobe">Back to wardrobe</ButtonLink>}
      >
        {error.status === 404 ? 'It may have been deleted.' : error.message}
      </EmptyState>
    )
  }

  const color = COLORS.find((option) => option.value === item.color)
  const addedOn = new Date(item.createdAt).toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className={styles.layout}>
      <Link to="/wardrobe" className={styles.back}>
        ← Wardrobe
      </Link>

      <div className={styles.photo}>
        <img src={item.imageUrl} alt={item.name} />
      </div>

      <div className={styles.details}>
        <p className="eyebrow">{labelFor(CATEGORIES, item.category)}</p>
        <h1 className={styles.name}>{item.name}</h1>
        {item.brand && <p className={styles.brand}>{item.brand}</p>}

        {/* A description list (<dl>) is the right HTML for label/value pairs. */}
        <dl className={styles.facts}>
          <div>
            <dt>Colour</dt>
            <dd className={styles.colorValue}>
              {color && (
                <span
                  className={styles.swatch}
                  style={{ background: color.swatch }}
                  aria-hidden="true"
                />
              )}
              {labelFor(COLORS, item.color)}
            </dd>
          </div>
          <div>
            <dt>Seasons</dt>
            <dd>
              {item.seasons.length
                ? item.seasons.map((s) => labelFor(SEASONS, s)).join(', ')
                : 'Any season'}
            </dd>
          </div>
          <div>
            <dt>Occasions</dt>
            <dd>
              {item.occasions.length
                ? item.occasions.map((o) => labelFor(OCCASIONS, o)).join(', ')
                : 'Not specified'}
            </dd>
          </div>
          <div>
            <dt>Added</dt>
            <dd>{addedOn}</dd>
          </div>
        </dl>

        {item.notes && (
          <div className={styles.notes}>
            <h2 className={styles.notesTitle}>Notes</h2>
            {/* pre-line keeps the line breaks the user typed */}
            <p>{item.notes}</p>
          </div>
        )}

        <div className={styles.actions}>
          <ButtonLink to={`/wardrobe/${id}/edit`}>Edit</ButtonLink>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>
            Delete
          </Button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title={`Delete ${item.name}?`}
        confirmLabel="Delete piece"
        busy={isDeleting}
        onConfirm={handleDelete}
        onCancel={() => {
          setConfirmOpen(false)
          setDeleteError('')
        }}
      >
        <p>This removes it from your closet for good.</p>
        {deleteError && (
          <p className={styles.deleteError} role="alert">
            {deleteError}
          </p>
        )}
      </ConfirmDialog>
    </article>
  )
}
