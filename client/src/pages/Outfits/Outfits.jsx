import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import PageHeader from '../../components/PageHeader/PageHeader.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'

export default function Outfits() {
  usePageTitle('Outfits')

  return (
    <>
      <PageHeader
        eyebrow="Your looks"
        title="Outfits"
        description="Combine pieces from your wardrobe into outfits, then save your favourites."
      />
      <EmptyState icon="outfit" title="No outfits yet">
        Once your wardrobe has a few pieces, you’ll be able to pair them into
        outfits here.
      </EmptyState>
    </>
  )
}
