import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  IconCheck,
  IconError,
  IconInfo,
  IconWarning,
} from './Icons'

const config = {
  success: {
    className:
      'border-emerald-300/50 bg-emerald-50/75 text-emerald-950 shadow-[0_8px_24px_-8px_rgba(16,185,129,0.25)] backdrop-blur-xl',
    iconWrap: 'bg-emerald-500/15 text-emerald-600 ring-1 ring-emerald-500/20',
    Icon: IconCheck,
  },
  error: {
    className:
      'border-red-300/50 bg-red-50/75 text-red-950 shadow-[0_8px_24px_-8px_rgba(239,68,68,0.2)] backdrop-blur-xl',
    iconWrap: 'bg-red-500/15 text-red-600 ring-1 ring-red-500/20',
    Icon: IconError,
  },
  info: {
    className:
      'border-sky-300/50 bg-sky-50/75 text-sky-950 shadow-[0_8px_24px_-8px_rgba(14,165,233,0.18)] backdrop-blur-xl',
    iconWrap: 'bg-sky-500/15 text-sky-600 ring-1 ring-sky-500/20',
    Icon: IconInfo,
  },
  warning: {
    className:
      'border-amber-300/50 bg-amber-50/75 text-amber-950 shadow-[0_8px_24px_-8px_rgba(245,158,11,0.18)] backdrop-blur-xl',
    iconWrap: 'bg-amber-500/15 text-amber-600 ring-1 ring-amber-500/20',
    Icon: IconWarning,
  },
}

export default function Alert({
  children,
  variant = 'info',
  className = '',
  autoDismiss = false,
  dismissAfter = 5000,
  onDismiss,
}) {
  const reducedMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const { className: variantClass, iconWrap, Icon } = config[variant]

  useEffect(() => {
    if (!autoDismiss || variant !== 'success') return undefined
    const timer = window.setTimeout(() => {
      setVisible(false)
      onDismiss?.()
    }, dismissAfter)
    return () => window.clearTimeout(timer)
  }, [autoDismiss, dismissAfter, onDismiss, variant])

  if (!visible) return null

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 8, scale: 0.98 }}
      animate={
        variant === 'error' && !reducedMotion
          ? { opacity: 1, y: 0, scale: 1, x: [0, -4, 4, -3, 3, 0] }
          : { opacity: 1, y: 0, scale: 1 }
      }
      exit={{ opacity: 0, y: -4 }}
      transition={
        variant === 'error'
          ? { x: { duration: 0.45 }, opacity: { duration: 0.2 } }
          : { duration: 0.25, ease: 'easeOut' }
      }
      className={`flex gap-3 rounded-2xl border px-4 py-3.5 text-sm leading-relaxed ${variantClass} ${className}`}
      role="alert"
    >
      <motion.span
        initial={reducedMotion ? false : { scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.05, duration: 0.2 }}
        className={`mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${iconWrap}`}
      >
        <Icon className="h-4 w-4" strokeWidth={2.25} />
      </motion.span>
      <div className="min-w-0 flex-1 pt-1">{children}</div>
    </motion.div>
  )
}
