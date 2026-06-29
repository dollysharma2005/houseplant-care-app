import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import SupabaseConfigAlert from '../components/auth/SupabaseConfigAlert'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../utils/constants'
import { fadeInReduced, formReveal, getMotionProps } from '../utils/motion'

export default function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const revealProps = getMotionProps(reducedMotion, formReveal, fadeInReduced)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSuccess('')

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setSubmitting(true)

    try {
      const data = await signUp(email, password)
      if (data.session) {
        navigate(ROUTES.DASHBOARD, { replace: true })
        return
      }
      setSuccess(
        'Account created. Check your email to confirm your account, then sign in.',
      )
      navigate(ROUTES.LOGIN)
    } catch (err) {
      setError(err.message ?? 'Unable to create account. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card variant="glass">
      <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900">
        Create account
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">
        Start tracking your houseplants today.
      </p>

      <SupabaseConfigAlert />

      <motion.form
        onSubmit={handleSubmit}
        initial={revealProps.initial}
        animate={revealProps.animate}
        transition={revealProps.transition}
        className="mt-8 space-y-5"
      >
        {error && <Alert variant="error">{error}</Alert>}
        {success && <Alert variant="success" autoDismiss>{success}</Alert>}

        <Input
          id="email"
          type="email"
          label="Email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <Input
          id="password"
          type="password"
          label="Password"
          autoComplete="new-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Input
          id="confirmPassword"
          type="password"
          label="Confirm password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />

        <Button type="submit" className="w-full" loading={submitting}>
          Create account
        </Button>
      </motion.form>

      <p className="mt-8 text-center text-sm text-zinc-600">
        Already have an account?{' '}
        <Link
          to={ROUTES.LOGIN}
          className="font-semibold text-primary-600 transition-colors hover:text-primary-700"
        >
          Sign in
        </Link>
      </p>
    </Card>
  )
}
