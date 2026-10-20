import styles from './Button.module.css'

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
  const classes = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  )
}
