import { createContext } from 'react'

/*
  Shares "who is logged in" with every component in the app, plus the
  actions that change it (logIn, signUp, logOut). Filled in by
  <AuthProvider>; read with the useAuth() hook.
*/
export const AuthContext = createContext(null)
