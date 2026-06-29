import { motion, useReducedMotion } from 'framer-motion'
import { cardHover, fadeIn, fadeInReduced, getMotionProps } from '../../utils/motion'

const variants = {
  solid: 'surface-card p-6 sm:p-8',
  glass: 'premium-card p-6 sm:p-8',
  panel: 'glass-panel p-6 sm:p-8',
}

export default function Card({
  children,
  className = '',
  hover = true,
  animate = true,
  variant = 'glass',
}) {
  const reducedMotion = useReducedMotion()
  const fadeProps = getMotionProps(reducedMotion, fadeIn, fadeInReduced)
  const isGlass = variant === 'glass' || variant === 'panel'

  return (
    <motion.div
      initial={animate ? fadeProps.initial : false}
      animate={animate ? fadeProps.animate : undefined}
      transition={animate ? fadeProps.transition : undefined}
      whileHover={hover && !reducedMotion ? cardHover : undefined}
      className={`relative overflow-hidden ${variants[variant] ?? variants.glass} ${className}`}
    >
      {isGlass && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white/60 to-transparent"
          aria-hidden="true"
        />
      )}
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  )
}
