import { Link } from 'react-router'
import styles from './Button.module.css'

function buttonClasses(variant, size, className) {
  return [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ')
}

/*
  Looks like a button but navigates like a link. Use this when clicking
  takes you to another page ("Add a piece" → /wardrobe), and <Button>
  when clicking does something on the current page (save, delete).
  Screen readers announce the difference, so picking the right one matters.
*/
export function ButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  return (
    <Link to={to} className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </Link>
  )
}

/*
  One button component for the whole app, so every button looks and
  behaves the same.

  Props:
    variant: 'primary' | 'secondary' | 'ghost' | 'danger'
    size:    'md' | 'sm'
    ...rest: any normal <button> prop (onClick, disabled, type, aria-label…)
*/
export default function Button({
  variant = 'primary',
  size = 'md',
  type = 'button', // default to "button" so it never submits a form by accident
  className = '',
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={buttonClasses(variant, size, className)}
      {...rest}
    >
      {children}
    </button>
  )
}
