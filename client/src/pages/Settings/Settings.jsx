import EmptyState from '../../components/EmptyState/EmptyState.jsx'
import PageHeader from '../../components/PageHeader/PageHeader.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'

export default function Settings() {
  usePageTitle('Settings')

  return (
    <>
      <PageHeader
        eyebrow="Account"
        title="Settings"
        description="Your profile, preferences and sign-in details."
        looks={['oat-knit', 'blossom-pink', 'all-white']}
      />
      <EmptyState icon="user" title="No account yet">
        Profile and account settings will be available once sign-in is set up.
      </EmptyState>
    </>
  )
}
