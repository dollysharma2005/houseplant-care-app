import { motion, useReducedMotion } from 'framer-motion'
import { statReveal } from '../../utils/motion'
import Card from './Card'
import {
  Calendar,
  Heart,
  Leaf,
  Sprout,
} from 'lucide-react'

const statConfig = {
  'Total plants': {
    Icon: Sprout,
    accent: 'from-emerald-400 via-primary-400 to-green-500',
    glow: 'shadow-[0_0_40px_-8px_rgba(34,197,94,0.45)]',
    iconBg: 'bg-gradient-to-br from-emerald-500/15 to-primary-500/10 text-emerald-600 ring-emerald-500/20',
  },
  Favorites: {
    Icon: Heart,
    accent: 'from-rose-400 via-pink-400 to-red-500',
    glow: 'shadow-[0_0_40px_-8px_rgba(244,63,94,0.35)]',
    iconBg: 'bg-gradient-to-br from-rose-500/15 to-pink-500/10 text-rose-600 ring-rose-500/20',
  },
  Healthy: {
    Icon: Leaf,
    accent: 'from-green-400 via-emerald-400 to-teal-500',
    glow: 'shadow-[0_0_40px_-8px_rgba(16,185,129,0.35)]',
    iconBg: 'bg-gradient-to-br from-green-500/15 to-emerald-500/10 text-green-600 ring-green-500/20',
  },
  'Needs water': {
    Icon: Calendar,
    accent: 'from-amber-400 via-orange-400 to-yellow-500',
    glow: 'shadow-[0_0_40px_-8px_rgba(245,158,11,0.35)]',
    iconBg: 'bg-gradient-to-br from-amber-500/15 to-orange-500/10 text-amber-600 ring-amber-500/20',
  },
  Overdue: {
    Icon: Calendar,
    accent: 'from-red-400 via-rose-400 to-red-600',
    glow: 'shadow-[0_0_40px_-8px_rgba(239,68,68,0.35)]',
    iconBg: 'bg-gradient-to-br from-red-500/15 to-rose-500/10 text-red-600 ring-red-500/20',
  },
}

const defaultConfig = {
  Icon: Leaf,
  accent: 'from-primary-400 to-emerald-500',
  glow: 'shadow-[0_0_40px_-8px_rgba(34,197,94,0.35)]',
  iconBg: 'bg-primary-500/10 text-primary-600 ring-primary-500/20',
}

export default function AnimatedStatCard({ label, value, index = 0 }) {
  const reducedMotion = useReducedMotion()
  const reveal = statReveal(index)
  const config = statConfig[label] ?? defaultConfig
  const Icon = config.Icon

  return (
    <motion.div
      initial={reveal.initial}
      animate={reveal.animate}
      transition={reducedMotion ? { duration: 0.1 } : reveal.transition}
      whileHover={reducedMotion ? undefined : { y: -4 }}
    >
      <Card variant="glass" animate={false} hover={false} className={`group ${config.glow}`}>
        <div
          className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${config.accent}`}
          aria-hidden="true"
        />
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
              {label}
            </p>
            <motion.p
              key={value}
              initial={reducedMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="font-display mt-3 text-4xl font-bold tracking-tight text-zinc-900"
            >
              {value}
            </motion.p>
          </div>
          <span
            className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-105 ${config.iconBg}`}
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>
        </div>
      </Card>
    </motion.div>
  )
}
