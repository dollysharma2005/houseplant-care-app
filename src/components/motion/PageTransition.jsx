import { motion, useReducedMotion } from 'framer-motion'
import {
  getMotionProps,
  pageTransition,
  pageTransitionReduced,
} from '../../utils/motion'

export default function PageTransition({ children }) {
  const reducedMotion = useReducedMotion()
  const motionProps = getMotionProps(
    reducedMotion,
    pageTransition,
    pageTransitionReduced,
  )

  return (
    <motion.div
      initial={motionProps.initial}
      animate={motionProps.animate}
      exit={motionProps.exit}
      transition={motionProps.transition}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}
