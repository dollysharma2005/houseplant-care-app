import { motion } from 'framer-motion'
import { IconEmpty, IconSparkles } from './Icons'
import Button from './Button'

export default function EmptyState({
  title,
  description,
  action,
  icon: Icon = IconEmpty,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="premium-card flex flex-col items-center justify-center px-6 py-16 text-center sm:px-12 sm:py-20"
    >
      <div className="relative mb-8">
        <div
          className="absolute inset-0 scale-150 rounded-full bg-gradient-to-br from-primary-400/20 to-emerald-400/10 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 to-emerald-600 text-white shadow-[0_12px_32px_rgba(22,163,74,0.35)] ring-1 ring-white/30">
          <Icon className="h-10 w-10" strokeWidth={1.75} />
        </div>
        <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-amber-500 shadow-md ring-1 ring-white/80">
          <IconSparkles className="h-4 w-4" />
        </span>
      </div>

      <h3 className="font-display text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
        {title}
      </h3>
      {description && (
        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base">
          {description}
        </p>
      )}
      {action && <div className="mt-8">{action}</div>}
    </motion.div>
  )
}
