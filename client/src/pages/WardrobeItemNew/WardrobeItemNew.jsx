import { useNavigate } from 'react-router'
import { createItem } from '../../api/wardrobe.js'
import ItemForm from '../../components/ItemForm/ItemForm.jsx'
import PageHeader from '../../components/PageHeader/PageHeader.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import useToast from '../../hooks/useToast.js'

export default function WardrobeItemNew() {
  usePageTitle('Add a piece')
  const navigate = useNavigate()
  const showToast = useToast()

  async function handleCreate(values) {
    const item = await createItem(values) // errors bubble up to ItemForm
    showToast('Added to your closet')
    navigate(`/wardrobe/${item.id}`)
  }

  return (
    <>
      <PageHeader
        eyebrow="Wardrobe"
        title="Add a piece"
        description="A clear photo on a plain background looks best in your closet."
      />
      <ItemForm submitLabel="Add to closet" cancelTo="/wardrobe" onSubmit={handleCreate} />
    </>
  )
}
