import { useCallback, useEffect, useState } from 'react'

/*
  Loads data when a page appears and tracks the three states every
  data-driven screen has: loading → success (data) or failure (error).

    const { data, error, isLoading, reload } = useAsyncData(listItems)

  `load` must be a stable function (defined outside the component, or
  wrapped in useCallback), otherwise it would re-run on every render.
*/
export default function useAsyncData(load) {
  const [state, setState] = useState({ data: null, error: null, isLoading: true })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    // If the page is left before the request finishes, `ignore` stops us
    // from updating state on a component that's no longer on screen.
    let ignore = false

    load()
      .then((data) => {
        if (!ignore) setState({ data, error: null, isLoading: false })
      })
      .catch((error) => {
        // "Not found" is an expected outcome the page handles; anything
        // else is a real problem worth logging for debugging.
        if (error.status !== 404) console.error(error)
        if (!ignore) setState({ data: null, error, isLoading: false })
      })

    return () => {
      ignore = true
    }
  }, [load, attempt])

  // "Try again" button: show the loading state, then run the effect again.
  const reload = useCallback(() => {
    setState({ data: null, error: null, isLoading: true })
    setAttempt((n) => n + 1)
  }, [])

  return { ...state, reload }
}
