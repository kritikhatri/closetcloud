import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getItem, updateItem } from '../../api/wardrobe.js'
import { ButtonLink } from '../../components/Button/Button.jsx'
import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import ItemForm from '../../components/ItemForm/ItemForm.jsx'
import PageHeader from '../../components/PageHeader/PageHeader.jsx'
import useAsyncData from '../../hooks/useAsyncData.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import useToast from '../../hooks/useToast.js'

export default function WardrobeItemEdit() {
  const { id } = useParams() // the ":id" part of /wardrobe/:id/edit
  const navigate = useNavigate()
  const showToast = useToast()

  // useCallback keeps the same function between renders (until `id`
  // changes), so useAsyncData doesn't reload on every render.
  const load = useCallback(() => getItem(id), [id])
  const { data: item, error, isLoading } = useAsyncData(load)

  usePageTitle(item ? `Edit ${item.name}` : 'Edit piece')

  async function handleUpdate(values) {
    await updateItem(id, values)
    showToast('Changes saved')
    navigate(`/wardrobe/${id}`)
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

  return (
    <>
      <PageHeader eyebrow="Wardrobe" title={`Edit ${item.name}`} />
      <ItemForm
        initialValues={item}
        submitLabel="Save changes"
        cancelTo={`/wardrobe/${id}`}
        onSubmit={handleUpdate}
      />
    </>
  )
}
