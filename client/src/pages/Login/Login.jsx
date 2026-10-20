import { useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router'
import AuthLayout from '../../components/Auth/AuthLayout.jsx'
import Button from '../../components/Button/Button.jsx'
import { PasswordField, TextField } from '../../components/Field/Field.jsx'
import useAuth from '../../hooks/useAuth.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import { safeRedirect } from '../../utils/safeRedirect.js'
import styles from '../Signup/AuthForm.module.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Login() {
  usePageTitle('Log in')
  const { user, logIn } = useAuth()
  const [searchParams] = useSearchParams()
  const next = safeRedirect(searchParams.get('next'))

  const [values, setValues] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Already logged in (or just logged in successfully)? Go to the app.
  if (user) return <Navigate to={next} replace />

  function update(field) {
    return (event) => {
      setValues((current) => ({ ...current, [field]: event.target.value }))
      setErrors((current) => ({ ...current, [field]: undefined }))
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setFormError('')

    const found = {}
    if (!EMAIL_PATTERN.test(values.email.trim())) found.email = 'Enter a valid email address.'
    if (!values.password) found.password = 'Enter your password.'
    if (Object.keys(found).length) return setErrors(found)

    setIsSubmitting(true)
    try {
      await logIn({ email: values.email, password: values.password })
      // Success: the user is now set, so this page re-renders and the
      // <Navigate> above takes over.
    } catch (error) {
      setErrors(error.fieldErrors ?? {})
      setFormError(error.message)
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      title={
        <>
          Log in to your <em>closet</em>
        </>
      }
      subtitle="Pick up where you left off."
      footer={
        <>
          New to ClosetCloud?{' '}
          <Link to={`/signup${next !== '/home' ? `?next=${encodeURIComponent(next)}` : ''}`}>
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className={styles.form}>
        {formError && (
          <p className={styles.formError} role="alert">
            {formError}
          </p>
        )}
        <TextField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          value={values.email}
          onChange={update('email')}
          error={errors.email}
        />
        <PasswordField
          label="Password"
          name="password"
          autoComplete="current-password"
          value={values.password}
          onChange={update('password')}
          error={errors.password}
        />
        <Button type="submit" disabled={isSubmitting} className={styles.submit}>
          {isSubmitting ? 'Logging in…' : 'Log in'}
        </Button>
      </form>
    </AuthLayout>
  )
}
