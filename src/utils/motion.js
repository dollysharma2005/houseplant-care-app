export const fastTransition = { duration: 0.2, ease: 'easeOut' }

export const pageTransition = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
  transition: fastTransition,
}

export const pageTransitionReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.1 },
}

export const fadeIn = {
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: fastTransition,
}

export const fadeInReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.1 },
}

export const formReveal = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.25, ease: 'easeOut' },
}

export const cardHover = {
  y: -4,
  boxShadow:
    '0 20px 40px -12px rgba(15, 23, 42, 0.15), 0 8px 16px -8px rgba(15, 23, 42, 0.08)',
  transition: fastTransition,
}

export const buttonHover = {
  scale: 1.02,
  transition: fastTransition,
}

export const buttonTap = {
  scale: 0.98,
  transition: fastTransition,
}

export const spinnerPulse = {
  opacity: [0.65, 1, 0.65],
  rotate: 360,
}

export const spinnerTransition = {
  opacity: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
  rotate: { duration: 0.8, repeat: Infinity, ease: 'linear' },
}

export const skeletonPulse = {
  opacity: [0.45, 0.85, 0.45],
}

export const skeletonTransition = {
  duration: 1.4,
  repeat: Infinity,
  ease: 'easeInOut',
}

export const statReveal = (index = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.22, ease: 'easeOut', delay: index * 0.04 },
})

export function getMotionProps(reducedMotion, full, reduced) {
  return reducedMotion ? reduced : full
}
