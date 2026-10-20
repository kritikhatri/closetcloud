import { useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router'
import AuthLayout from '../../components/Auth/AuthLayout.jsx'
import Button from '../../components/Button/Button.jsx'
import { PasswordField, TextField } from '../../components/Field/Field.jsx'
import useAuth from '../../hooks/useAuth.js'
import usePageTitle from '../../hooks/usePageTitle.js'
import { safeRedirect } from '../../utils/safeRedirect.js'
import styles from './AuthForm.module.css'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD = 8

export default function Signup() {
  usePageTitle('Create your account')
  const { user, signUp } = useAuth()
  const [searchParams] = useSearchParams()
  const next = safeRedirect(searchParams.get('next'))

  const [values, setValues] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    // Same rules as the server (server/src/validation/auth.js), checked
    // here first for instant feedback.
    const found = {}
    if (!values.name.trim()) found.name = 'Enter your name.'
    if (!EMAIL_PATTERN.test(values.email.trim())) found.email = 'Enter a valid email address.'
    if (values.password.length < MIN_PASSWORD) found.password = 'Use at least 8 characters.'
    if (Object.keys(found).length) return setErrors(found)

    setIsSubmitting(true)
    try {
      await signUp(values)
    } catch (error) {
      setErrors(error.fieldErrors ?? {})
      setFormError(error.message)
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Join ClosetCloud"
      title={
        <>
          Start your <em>digital closet</em>
        </>
      }
      subtitle="Free, private, and yours. It takes less than a minute."
      footer={
        <>
          Already have an account?{' '}
          <Link to={`/login${next !== '/home' ? `?next=${encodeURIComponent(next)}` : ''}`}>
            Log in
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
          label="Name"
          name="name"
          autoComplete="name"
          value={values.name}
          onChange={update('name')}
          error={errors.name}
          maxLength={60}
        />
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
          // "new-password" tells password managers to offer a strong one.
          autoComplete="new-password"
          value={values.password}
          onChange={update('password')}
          error={errors.password}
          hint="At least 8 characters. A short phrase is easy to remember."
          maxLength={128}
        />
        <Button type="submit" disabled={isSubmitting} className={styles.submit}>
          {isSubmitting ? 'Creating your closet…' : 'Create account'}
        </Button>
      </form>
    </AuthLayout>
  )
}
