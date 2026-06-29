import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import PlantList from '../components/plants/PlantList'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import Input from '../components/ui/Input'
import Label from '../components/ui/Label'
import PageHeader from '../components/ui/PageHeader'
import Select from '../components/ui/Select'
import { IconPlus } from '../components/ui/Icons'
import { SkeletonPlantGrid } from '../components/ui/Skeleton'
import { usePlants } from '../hooks/usePlants'
import { PLANT_STATUS_OPTIONS, ROUTES } from '../utils/constants'
import { filterPlants } from '../utils/plantUtils'
import { buttonHover, buttonTap } from '../utils/motion'

export default function PlantsPage() {
  const { plants, loading, error, toggleFavorite } = usePlants()
  const reducedMotion = useReducedMotion()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [favoritesFilter, setFavoritesFilter] = useState('')
  const [togglingFavoriteId, setTogglingFavoriteId] = useState(null)
  const [toggleError, setToggleError] = useState('')

  const filteredPlants = useMemo(
    () =>
      filterPlants(plants, {
        search,
        status: statusFilter,
        favoritesOnly: favoritesFilter === 'favorites',
      }),
    [plants, search, statusFilter, favoritesFilter],
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
        title="My Plants"
        description="Manage your houseplant collection."
        action={
          <Link to={ROUTES.PLANT_NEW} className="hidden sm:block">
            <Button>
              <IconPlus className="h-4 w-4" strokeWidth={2.5} />
              Add Plant
            </Button>
          </Link>
        }
      />

      <div className="glass-panel mb-8 grid gap-5 p-5 sm:p-6 md:grid-cols-2 lg:grid-cols-3">
        <Input
          id="search"
          label="Search by name"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <div>
          <Label htmlFor="statusFilter">Filter by status</Label>
          <Select
            id="statusFilter"
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="">All statuses</option>
            {PLANT_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="favoritesFilter">Favorites</Label>
          <Select
            id="favoritesFilter"
            value={favoritesFilter}
            onChange={(event) => setFavoritesFilter(event.target.value)}
          >
            <option value="">All plants</option>
            <option value="favorites">Favorites only</option>
          </Select>
        </div>
      </div>

      {loading && <SkeletonPlantGrid count={6} />}

      {error && <Alert variant="error">{error}</Alert>}
      {toggleError && <Alert variant="error">{toggleError}</Alert>}

      {!loading && !error && filteredPlants.length === 0 && (
        <EmptyState
          title={plants.length === 0 ? 'No plants yet' : 'No matching plants'}
          description={
            plants.length === 0
              ? 'Add your first houseplant to start tracking its care.'
              : favoritesFilter === 'favorites'
                ? 'Mark plants as favorites using the heart icon on each card.'
                : 'Try adjusting your search or filters.'
          }
          action={
            plants.length === 0 ? (
              <Link to={ROUTES.PLANT_NEW}>
                <Button>Add your first plant</Button>
              </Link>
            ) : null
          }
        />
      )}

      {!loading && !error && filteredPlants.length > 0 && (
        <PlantList
          plants={filteredPlants}
          onToggleFavorite={handleToggleFavorite}
          togglingFavoriteId={togglingFavoriteId}
        />
      )}

      <Link to={ROUTES.PLANT_NEW} className="fixed bottom-24 right-4 z-40 md:hidden">
        <motion.span
          whileHover={!reducedMotion ? buttonHover : undefined}
          whileTap={!reducedMotion ? buttonTap : undefined}
          className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-b from-primary-500 to-primary-600 text-white shadow-[0_8px_24px_rgba(22,163,74,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] ring-1 ring-white/30"
          aria-label="Add plant"
        >
          <IconPlus className="h-6 w-6" strokeWidth={2.5} />
        </motion.span>
      </Link>
    </>
  )
}
