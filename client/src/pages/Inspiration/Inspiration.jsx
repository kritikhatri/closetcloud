import Button from '../../components/Button/Button.jsx'
import Icon from '../../components/Icon/Icon.jsx'
import LookBoard from '../../components/LookBoard/LookBoard.jsx'
import PageHeader from '../../components/PageHeader/PageHeader.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import useQuiz from '../../hooks/useQuiz.js'

export default function Inspiration() {
  usePageTitle('Inspiration')
  const { openQuiz } = useQuiz()

  return (
    <>
      <PageHeader
        eyebrow="Curated looks"
        title="Inspiration"
        description="Looks sorted by aesthetic. These are editorial photos, not pieces from your closet. Use them for ideas, then recreate them with what you own."
        looks={['rose-maxi', 'pink-faux-fur', 'sequin-gown']}
        actions={
          <Button onClick={openQuiz}>
            <Icon name="sparkle" size={18} />
            Find your aesthetic
          </Button>
        }
      />
      <LookBoard />
    </>
  )
}
