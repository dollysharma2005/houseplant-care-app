import { motion, useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'

export default function FavoriteButton({ isFavorite, onToggle, disabled = false }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onToggle()
      }}
      disabled={disabled}
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isFavorite}
      whileTap={!disabled && !reducedMotion ? { scale: 0.85 } : undefined}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/70 bg-white/60 text-zinc-400 shadow-sm backdrop-blur-sm transition-colors hover:border-rose-200/80 hover:bg-rose-50/80 hover:text-rose-500 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-500/15 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Heart
        className={`h-4 w-4 transition-colors ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`}
        strokeWidth={2.25}
      />
    </motion.button>
  )
}
