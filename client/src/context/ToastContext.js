import { createContext } from 'react'

/*
  Context lets any component, however deeply nested, reach shared
  functionality without passing props through every level. Here it
  carries one function: showToast(message).
*/
export const ToastContext = createContext(null)
