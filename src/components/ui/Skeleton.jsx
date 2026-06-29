import { motion, useReducedMotion } from 'framer-motion'
import { skeletonPulse, skeletonTransition } from '../../utils/motion'

export default function Skeleton({ className = '' }) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <div className={`rounded-2xl bg-zinc-200/90 ${className}`} aria-hidden="true" />
    )
  }

  return (
    <motion.div
      className={`skeleton-shimmer ${className}`}
      animate={skeletonPulse}
      transition={skeletonTransition}
      aria-hidden="true"
    />
  )
}

export function SkeletonStatGrid({ count = 5 }) {
  return (
    <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="premium-card relative p-6 sm:p-8">
          <Skeleton className="h-3 w-24 rounded-lg" />
          <Skeleton className="mt-4 h-10 w-16 rounded-xl" />
          <Skeleton className="absolute right-6 top-6 h-12 w-12 rounded-2xl" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonPlantGrid({ count = 3 }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="premium-card p-6 sm:p-8">
          <Skeleton className="h-5 w-2/3 rounded-lg" />
          <Skeleton className="mt-3 h-4 w-1/2 rounded-lg" />
          <Skeleton className="mt-8 h-4 w-full rounded-lg" />
        </div>
      ))}
    </div>
  )
}

export function SkeletonCalendar() {
  return (
    <div className="premium-card p-5 sm:p-8">
      <Skeleton className="mx-auto h-8 w-56 rounded-xl" />
      <Skeleton className="mt-8 h-72 w-full rounded-2xl" />
    </div>
  )
}

export function SkeletonForm() {
  return (
    <div className="premium-card space-y-6 p-6 sm:p-8">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="mb-3 h-3 w-24 rounded-lg" />
          <Skeleton className="h-12 w-full rounded-2xl" />
        </div>
      ))}
      <Skeleton className="h-11 w-36 rounded-2xl" />
    </div>
  )
}
