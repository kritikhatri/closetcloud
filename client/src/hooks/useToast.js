import { useContext } from 'react'
import { ToastContext } from '../context/ToastContext.js'

/*
  const showToast = useToast()
  showToast('Saved to your closet')
*/
export default function useToast() {
  const showToast = useContext(ToastContext)
  if (!showToast) throw new Error('useToast must be used inside <ToastProvider>')
  return showToast
}
