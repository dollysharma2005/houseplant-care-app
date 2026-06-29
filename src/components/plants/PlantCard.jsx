import { Link } from 'react-router-dom'
import { Calendar, MapPin } from 'lucide-react'
import Card from '../ui/Card'
import { ROUTES } from '../../utils/constants'
import { formatDisplayDate } from '../../utils/dateUtils'
import FavoriteButton from './FavoriteButton'
import PlantStatusBadge from './PlantStatusBadge'
import WateringReminderBadge from './WateringReminderBadge'

const reminderHighlight = {
  overdue:
    'ring-1 ring-red-200/60 shadow-[0_8px_32px_-8px_rgba(239,68,68,0.2)]',
  today:
    'ring-1 ring-amber-200/60 shadow-[0_8px_32px_-8px_rgba(245,158,11,0.2)]',
}

export default function PlantCard({
  plant,
  onToggleFavorite,
  togglingFavorite = false,
  wateringReminder,
}) {
  const highlightClass = wateringReminder
    ? reminderHighlight[wateringReminder]
    : ''

  return (
    <Card className={highlightClass}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          {onToggleFavorite && (
            <FavoriteButton
              isFavorite={plant.isFavorite}
              disabled={togglingFavorite}
              onToggle={() => onToggleFavorite(plant.id, !plant.isFavorite)}
            />
          )}
          <div className="min-w-0 flex-1">
            <Link
              to={ROUTES.PLANT_DETAIL(plant.id)}
              className="block truncate font-display text-lg font-bold tracking-tight text-zinc-900 transition-colors hover:text-primary-700"
            >
              {plant.plantName}
            </Link>
            {plant.species && (
              <p className="mt-1 truncate text-sm text-zinc-500">{plant.species}</p>
            )}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          {wateringReminder ? (
            <WateringReminderBadge type={wateringReminder} />
          ) : (
            <PlantStatusBadge status={plant.status} />
          )}
        </div>
      </div>

      <div className="mt-5 space-y-2 border-t border-zinc-100/80 pt-4 text-sm text-zinc-600">
        {plant.room && (
          <p className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-zinc-400" strokeWidth={2.25} />
            {plant.room}
          </p>
        )}
        {wateringReminder === 'overdue' && plant.nextWateringDate && (
          <p className="flex items-center gap-2 font-medium text-red-700">
            <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
            Due {formatDisplayDate(plant.nextWateringDate)}
          </p>
        )}
        {wateringReminder === 'today' && (
          <p className="flex items-center gap-2 font-medium text-amber-700">
            <Calendar className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
            Water today
          </p>
        )}
        {!wateringReminder && (
          <p className="flex items-center gap-2 text-zinc-500">
            <Calendar className="h-3.5 w-3.5 shrink-0 text-zinc-400" strokeWidth={2.25} />
            Added{' '}
            {new Date(plant.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        )}
      </div>
    </Card>
  )
}
