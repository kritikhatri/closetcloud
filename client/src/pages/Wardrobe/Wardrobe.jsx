import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import PageHeader from '../../components/PageHeader/PageHeader.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'

export default function Wardrobe() {
  usePageTitle('Wardrobe')

  return (
    <>
      <PageHeader
        eyebrow="Your closet"
        title="Wardrobe"
        description="Every piece you own, photographed and sorted by category, colour, season and occasion."
      />
      <EmptyState icon="hanger" title="Your closet is empty">
        Pieces you add will appear here as a photo grid you can search and
        filter.
      </EmptyState>
    </>
  )
}
