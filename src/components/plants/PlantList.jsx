import { motion, useReducedMotion } from 'framer-motion'
import { fadeIn, fadeInReduced, getMotionProps } from '../../utils/motion'
import PlantCard from './PlantCard'

export default function PlantList({
  plants,
  onToggleFavorite,
  togglingFavoriteId = null,
  wateringReminder,
}) {
  const reducedMotion = useReducedMotion()
  const motionProps = getMotionProps(reducedMotion, fadeIn, fadeInReduced)

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {plants.map((plant, index) => (
        <motion.div
          key={plant.id}
          initial={motionProps.initial}
          animate={motionProps.animate}
          transition={{
            ...motionProps.transition,
            delay: reducedMotion ? 0 : index * 0.05,
          }}
        >
          <PlantCard
            plant={plant}
            onToggleFavorite={onToggleFavorite}
            togglingFavorite={togglingFavoriteId === plant.id}
            wateringReminder={wateringReminder}
          />
        </motion.div>
      ))}
    </div>
  )
}
