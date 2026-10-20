import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import PageHeader from '../../components/PageHeader/PageHeader.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'

export default function Inspiration() {
  usePageTitle('Inspiration')

  return (
    <>
      <PageHeader
        eyebrow="Curated looks"
        title="Inspiration"
        description="Looks sorted by aesthetic, season and occasion. Save the ones you love and recreate them with your own pieces."
      />
      <EmptyState icon="inspiration" title="Inspiration is on its way">
        Curated looks (casual, college, minimal, coquette, streetwear, date
        night and formal) will be collected here.
      </EmptyState>
    </>
  )
}
