import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import PageHeader from '../../components/PageHeader/PageHeader.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'

export default function Calendar() {
  usePageTitle('Calendar')

  return (
    <>
      <PageHeader
        eyebrow="Plan ahead"
        title="Calendar"
        description="Assign saved outfits to dates and see what’s coming up this week."
        looks={['white-crosswalk', 'teal-coat', 'black-cami']}
      />
      <EmptyState looks={['trench-scarf', 'blush-backless', 'red-swirl']} title="Nothing planned yet">
        Outfits you schedule will appear here as a month view and an agenda of
        upcoming looks.
      </EmptyState>
    </>
  )
}
