import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext.js'

/*
  const { user, status, logIn, signUp, logOut } = useAuth()

  status is 'loading' while we ask the server who's logged in,
  'ready' once we know, or 'error' if the server couldn't be reached.
  user is the logged-in user, or null.
*/
export default function useAuth() {
  const auth = useContext(AuthContext)
  if (!auth) throw new Error('useAuth must be used inside <AuthProvider>')
  return auth
}
