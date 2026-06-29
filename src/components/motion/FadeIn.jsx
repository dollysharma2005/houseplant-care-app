import { motion, useReducedMotion } from 'framer-motion'
import { fadeIn, fadeInReduced, getMotionProps } from '../../utils/motion'

export default function FadeIn({
  children,
  className = '',
  delay = 0,
  as = 'div',
}) {
  const reducedMotion = useReducedMotion()
  const base = getMotionProps(reducedMotion, fadeIn, fadeInReduced)
  const Component = motion[as] ?? motion.div

  return (
    <Component
      initial={base.initial}
      animate={base.animate}
      transition={{ ...base.transition, delay: reducedMotion ? 0 : delay }}
      className={className}
    >
      {children}
    </Component>
  )
}
