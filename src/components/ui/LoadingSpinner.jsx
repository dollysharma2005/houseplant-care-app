import { motion, useReducedMotion } from 'framer-motion'

const sizeClasses = {
  sm: 'h-5 w-5',
  md: 'h-9 w-9',
  lg: 'h-12 w-12',
}

export default function LoadingSpinner({ size = 'md', className = '' }) {
  const reducedMotion = useReducedMotion()
  const dimension = sizeClasses[size]

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      role="status"
      aria-label="Loading"
    >
      {reducedMotion ? (
        <div
          className={`animate-spin rounded-full border-2 border-gray-200 border-t-primary-600 ${dimension}`}
        />
      ) : (
        <div className={`relative ${dimension}`}>
          <motion.span
            className={`absolute inset-0 rounded-full border-2 border-primary-300/40`}
            animate={{ scale: [1, 1.12, 1], opacity: [0.45, 0.15, 0.45] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className={`absolute inset-0 rounded-full border-2 border-gray-200/80 border-t-primary-600`}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.85, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      )}
    </div>
  )
}
