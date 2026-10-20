import { useCallback, useEffect, useMemo, useState } from 'react'
import * as authApi from '../../api/auth.js'
import { onUnauthorized } from '../../api/client.js'
import { setWardrobeOwner } from '../../api/wardrobe.js'
import { AuthContext } from '../../context/AuthContext.js'

/*
  Keeps track of who is logged in.

  On first load it asks the server GET /api/auth/me. The browser sends the
  httpOnly session cookie automatically; JavaScript never sees the cookie
  itself, only the answer ("you are Alice" or 401).
*/
export default function AuthProvider({ children }) {
  const [state, setState] = useState({
    status: 'loading',
    user: null,
    error: null,
    loggedOut: false,
  })

  // Every change of user goes through here, so the (temporary) local
  // wardrobe storage always points at the right account before any page
  // tries to read it. `loggedOut` records that the person chose to log out
  // (rather than their session expiring), so RequireAuth can send them to
  // the front page instead of the login form.
  const applyUser = useCallback((user, { loggedOut = false } = {}) => {
    setWardrobeOwner(user?.id ?? null)
    setState({ status: 'ready', user, error: null, loggedOut })
  }, [])

  const checkSession = useCallback(() => {
    return authApi
      .getCurrentUser()
      .then(applyUser)
      .catch((error) => setState({ status: 'error', user: null, error, loggedOut: false }))
  }, [applyUser])

  useEffect(() => {
    checkSession()
    // If any request later comes back 401 (session expired or deleted),
    // treat the user as logged out; protected pages then redirect to login.
    onUnauthorized(() => applyUser(null))
    return () => onUnauthorized(null)
  }, [checkSession, applyUser])

  const logIn = useCallback(
    async (credentials) => {
      const user = await authApi.logIn(credentials)
      applyUser(user)
      return user
    },
    [applyUser],
  )

  const signUp = useCallback(
    async (details) => {
      const user = await authApi.signUp(details)
      applyUser(user)
      return user
    },
    [applyUser],
  )

  const logOut = useCallback(async () => {
    await authApi.logOut()
    applyUser(null, { loggedOut: true })
  }, [applyUser])

  const retry = useCallback(() => {
    setState({ status: 'loading', user: null, error: null, loggedOut: false })
    checkSession()
  }, [checkSession])

  // useMemo: only hand out a new object when something actually changed,
  // so components using useAuth() don't re-render for no reason.
  const value = useMemo(
    () => ({ ...state, logIn, signUp, logOut, retry }),
    [state, logIn, signUp, logOut, retry],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
