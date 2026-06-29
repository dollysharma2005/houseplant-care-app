import { motion, useReducedMotion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { buttonHover, buttonTap } from '../../utils/motion'

const variants = {
  primary:
    'relative overflow-hidden bg-gradient-to-b from-primary-500 to-primary-600 text-white shadow-[0_4px_14px_rgba(22,163,74,0.35),inset_0_1px_0_rgba(255,255,255,0.2)] hover:from-primary-600 hover:to-primary-700 focus-visible:ring-primary-500/40',
  secondary:
    'border border-white/80 bg-white/60 text-zinc-700 shadow-[0_2px_12px_rgba(15,23,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl hover:bg-white/80 focus-visible:ring-zinc-400/30',
  danger:
    'bg-gradient-to-b from-red-500 to-red-600 text-white shadow-[0_4px_14px_rgba(220,38,38,0.28),inset_0_1px_0_rgba(255,255,255,0.15)] hover:from-red-600 hover:to-red-700 focus-visible:ring-red-500/40',
  ghost:
    'text-zinc-600 hover:bg-white/60 hover:text-zinc-900 focus-visible:ring-zinc-400/30',
}

const sizes = {
  sm: 'min-h-9 px-3.5 text-sm',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  disabled = false,
  loading = false,
  ...props
}) {
  const reducedMotion = useReducedMotion()
  const isDisabled = disabled || loading

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      whileHover={!isDisabled && !reducedMotion ? buttonHover : undefined}
      whileTap={!isDisabled && !reducedMotion ? buttonTap : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {loading && (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      )}
      {children}
    </motion.button>
  )
}
