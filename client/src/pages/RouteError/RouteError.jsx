import { isRouteErrorResponse, useRouteError } from 'react-router'
import { ButtonLink } from '../../components/Button/Button.jsx'
import usePageTitle from '../../hooks/usePageTitle.js'
import styles from './RouteError.module.css'

/*
  React Router shows this when a URL doesn't match any page (404)
  or when a page crashes while rendering. Without it, users would see
  React Router's plain developer error screen.
*/
export default function RouteError() {
  const error = useRouteError()
  const notFound = isRouteErrorResponse(error) && error.status === 404

  usePageTitle(notFound ? 'Page not found' : 'Something went wrong')

  // Never hide real errors: log them so they show up in the console.
  if (!notFound) console.error(error)

  return (
    <div className={styles.page}>
      <p className="eyebrow">{notFound ? 'Error 404' : 'Unexpected error'}</p>
      <h1>{notFound ? 'This page isn’t in the closet' : 'Something went wrong'}</h1>
      <p className="muted">
        {notFound
          ? 'The link may be broken, or the page may have moved.'
          : 'Please try again. If it keeps happening, reload the page.'}
      </p>
      <ButtonLink to="/">Back to home</ButtonLink>
    </div>
  )
}
