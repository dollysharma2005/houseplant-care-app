import { useMemo } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import { useNavigate } from 'react-router-dom'
import { CalendarDays } from 'lucide-react'
import Alert from '../components/ui/Alert'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import { SkeletonCalendar } from '../components/ui/Skeleton'
import { usePlants } from '../hooks/usePlants'
import { ROUTES } from '../utils/constants'
import { formatDisplayDate, groupPlantsByWateringDate, toDateKey } from '../utils/dateUtils'

export default function CalendarPage() {
  const { plants, loading, error } = usePlants()
  const navigate = useNavigate()

  const plantsByDate = useMemo(
    () => groupPlantsByWateringDate(plants),
    [plants],
  )

  const scheduledCount = useMemo(() => {
    return plants.filter((plant) => plant.nextWateringDate).length
  }, [plants])

  const tileContent = ({ date, view }) => {
    if (view !== 'month') return null

    const dayPlants = plantsByDate.get(toDateKey(date))
    if (!dayPlants?.length) return null

    return (
      <div className="mt-1 space-y-0.5">
        {dayPlants.map((plant) => (
          <button
            key={plant.id}
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              navigate(ROUTES.PLANT_DETAIL(plant.id))
            }}
            className="block w-full truncate rounded-lg border border-primary-200/60 bg-primary-50/90 px-1.5 py-0.5 text-left text-[10px] font-semibold text-primary-800 backdrop-blur-sm transition-colors hover:bg-primary-100 sm:text-xs"
          >
            {plant.plantName}
          </button>
        ))}
      </div>
    )
  }

  return (
    <>
      <PageHeader
        title="Calendar"
        description="See when each plant is scheduled for watering."
      />

      {loading && <SkeletonCalendar />}

      {error && <Alert variant="error">{error}</Alert>}

      {!loading && !error && (
        <>
          <Card variant="glass" className="mb-6 !p-5">
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-500/10 text-primary-600 ring-1 ring-primary-500/20">
                <CalendarDays className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <p className="text-sm leading-relaxed text-zinc-600">
                {scheduledCount === 0
                  ? 'No watering dates set yet. Add a next watering date when creating or editing a plant.'
                  : `${scheduledCount} plant${scheduledCount === 1 ? '' : 's'} scheduled on the calendar.`}
              </p>
            </div>
          </Card>

          <Card variant="glass" className="homeplant-calendar overflow-x-auto !p-3 sm:!p-5">
            <Calendar tileContent={tileContent} className="w-full border-0" />
          </Card>

          {scheduledCount > 0 && (
            <section className="mt-8">
              <h2 className="section-title mb-5">Upcoming watering</h2>
              <div className="space-y-3">
                {[...plantsByDate.entries()]
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([date, dayPlants]) => (
                    <Card key={date} variant="glass" className="!p-5" hover={false}>
                      <p className="text-sm font-semibold text-zinc-900">
                        {formatDisplayDate(date)}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {dayPlants.map((plant) => (
                          <li key={plant.id}>
                            <button
                              type="button"
                              onClick={() =>
                                navigate(ROUTES.PLANT_DETAIL(plant.id))
                              }
                              className="rounded-lg px-2 py-1 text-sm font-medium text-primary-600 transition-colors hover:bg-primary-50 hover:text-primary-700"
                            >
                              {plant.plantName}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </Card>
                  ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  )
}
