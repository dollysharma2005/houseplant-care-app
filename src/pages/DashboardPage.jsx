import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Droplets, Heart, Sprout } from 'lucide-react'
import PlantList from '../components/plants/PlantList'
import Alert from '../components/ui/Alert'
import AnimatedStatCard from '../components/ui/AnimatedStatCard'
import Card from '../components/ui/Card'
import EmptyState from '../components/ui/EmptyState'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import { SkeletonPlantGrid, SkeletonStatGrid } from '../components/ui/Skeleton'
import { usePlants } from '../hooks/usePlants'
import { PLANT_STATUS_OPTIONS, ROUTES } from '../utils/constants'
import { getPlantsNeedingWater } from '../utils/dateUtils'
import { getFavoritePlants, getPlantStats } from '../utils/plantUtils'

function SectionHeader({ title, action }) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <h2 className="section-title">{title}</h2>
      {action}
    </div>
  )
}

export default function DashboardPage() {
  const { plants, loading, error, toggleFavorite } = usePlants()
  const [togglingFavoriteId, setTogglingFavoriteId] = useState(null)
  const [toggleError, setToggleError] = useState('')

  const stats = getPlantStats(plants)
  const favoritePlants = getFavoritePlants(plants)
  const recentPlants = plants.slice(0, 3)
  const { overdue, today } = useMemo(
    () => getPlantsNeedingWater(plants),
    [plants],
  )

  const handleToggleFavorite = async (id, isFavorite) => {
    setToggleError('')
    setTogglingFavoriteId(id)

    try {
      await toggleFavorite(id, isFavorite)
    } catch (err) {
      setToggleError(err.message ?? 'Unable to update favorite.')
    } finally {
      setTogglingFavoriteId(null)
    }
  }
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your plants and their current status."
      />

      {loading && (
        <>
          <SkeletonStatGrid count={5} />
          <SkeletonPlantGrid count={3} />
        </>
      )}

      {error && <Alert variant="error">{error}</Alert>}
      {toggleError && <Alert variant="error">{toggleError}</Alert>}

      {!loading && !error && (
        <>
          <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <AnimatedStatCard label="Total plants" value={stats.total} index={0} />
            <AnimatedStatCard
              label="Favorites"
              value={favoritePlants.length}
              index={1}
            />
            {PLANT_STATUS_OPTIONS.map((option, index) => (
              <AnimatedStatCard
                key={option.value}
                label={option.label}
                value={stats.byStatus[option.value] ?? 0}
                index={index + 2}
              />
            ))}
          </div>

          <section className="mb-10">
            <SectionHeader title="Plants Needing Water Today" />

            {overdue.length === 0 && today.length === 0 ? (
              <Card variant="glass" className="!p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 ring-1 ring-sky-500/20">
                    <Droplets className="h-5 w-5" strokeWidth={2.25} />
                  </span>
                  <div>
                    <p className="font-medium text-zinc-900">All caught up</p>
                    <p className="mt-1 text-sm leading-relaxed text-zinc-500">
                      No plants need watering today. Set a next watering date on your
                      plants to see reminders here.
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="space-y-8">
                {overdue.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-red-600">
                      Overdue ({overdue.length})
                    </h3>
                    <PlantList
                      plants={overdue}
                      wateringReminder="overdue"
                      onToggleFavorite={handleToggleFavorite}
                      togglingFavoriteId={togglingFavoriteId}
                    />
                  </div>
                )}
                {today.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-amber-600">
                      Today ({today.length})
                    </h3>
                    <PlantList
                      plants={today}
                      wateringReminder="today"
                      onToggleFavorite={handleToggleFavorite}
                      togglingFavoriteId={togglingFavoriteId}
                    />
                  </div>
                )}
              </div>
            )}
          </section>

          <section className="mb-10">
            <SectionHeader
              title="Favorite plants"
              action={
                favoritePlants.length > 0 ? (
                  <Link
                    to={ROUTES.PLANTS}
                    className="text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                  >
                    View all →
                  </Link>
                ) : null
              }
            />

            {favoritePlants.length === 0 ? (
              <EmptyState
                title="No favorites yet"
                description="Tap the heart on any plant card to add one here."
                icon={Heart}
              />
            ) : (
              <PlantList
                plants={favoritePlants}
                onToggleFavorite={handleToggleFavorite}
                togglingFavoriteId={togglingFavoriteId}
              />
            )}
          </section>

          <section>
            <SectionHeader
              title="Recent plants"
              action={
                <Link
                  to={ROUTES.PLANTS}
                  className="text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                >
                  View all →
                </Link>
              }
            />

            {recentPlants.length === 0 ? (
              <EmptyState
                title="No plants yet"
                description="Add your first plant to start tracking its care."
                icon={Sprout}
                action={
                  <Link to={ROUTES.PLANT_NEW}>
                    <Button>Add your first plant</Button>
                  </Link>
                }
              />
            ) : (
              <PlantList
                plants={recentPlants}
                onToggleFavorite={handleToggleFavorite}
                togglingFavoriteId={togglingFavoriteId}
              />
            )}
          </section>
        </>
      )}
    </>
  )
}
