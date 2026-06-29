import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import SupabaseConfigAlert from '../components/auth/SupabaseConfigAlert'
import { useAuth } from '../hooks/useAuth'
import { ROUTES } from '../utils/constants'
import { fadeInReduced, formReveal, getMotionProps } from '../utils/motion'

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const revealProps = getMotionProps(reducedMotion, formReveal, fadeInReduced)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const from = location.state?.from?.pathname ?? ROUTES.DASHBOARD

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await signIn(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message ?? 'Unable to sign in. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card variant="glass">
      <h2 className="font-display text-2xl font-bold tracking-tight text-zinc-900">
        Sign in
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-500">
        Welcome back. Sign in to manage your plants.
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
          autoComplete="current-password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button type="submit" className="w-full" loading={submitting}>
          Sign in
        </Button>
      </motion.form>

      <p className="mt-8 text-center text-sm text-zinc-600">
        Don&apos;t have an account?{' '}
        <Link
          to={ROUTES.REGISTER}
          className="font-semibold text-primary-600 transition-colors hover:text-primary-700"
        >
          Create one
        </Link>
      </p>
    </Card>
  )
}
