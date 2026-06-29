import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Calendar, MapPin, StickyNote } from 'lucide-react'
import PlantStatusBadge from '../components/plants/PlantStatusBadge'
import Alert from '../components/ui/Alert'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import { SkeletonForm } from '../components/ui/Skeleton'
import PageHeader from '../components/ui/PageHeader'
import { usePlant, usePlants } from '../hooks/usePlants'
import { getStatusLabel } from '../utils/plantUtils'
import { formatDisplayDate } from '../utils/dateUtils'
import { ROUTES } from '../utils/constants'

function DetailRow({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-zinc-100/80 bg-white/50 p-4 backdrop-blur-sm">
      <dt className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
        <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium text-zinc-900">{value}</dd>
    </div>
  )
}

export default function PlantDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { plant, loading, error } = usePlant(id)
  const { removePlant } = usePlants()

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete "${plant.plantName}"? This action cannot be undone.`,
    )
    if (!confirmed) return

    try {
      await removePlant(id)
      navigate(ROUTES.PLANTS)
    } catch (err) {
      window.alert(err.message ?? 'Unable to delete plant.')
    }
  }

  if (loading) {
    return (
      <div className="py-8">
        <SkeletonForm />
      </div>
    )
  }

  if (error || !plant) {
    return (
      <>
        <Alert variant="error">{error ?? 'Plant not found.'}</Alert>
        <Link
          to={ROUTES.PLANTS}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
          Back to plants
        </Link>
      </>
    )
  }

  return (
    <>
      <PageHeader
        title={plant.plantName}
        description={plant.species || 'Houseplant details'}
        action={
          <div className="flex flex-wrap gap-2">
            <Link to={ROUTES.PLANT_EDIT(id)}>
              <Button variant="secondary">Edit</Button>
            </Link>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        }
      />

      <Card variant="glass">
        <div className="flex flex-wrap items-center gap-3">
          <PlantStatusBadge status={plant.status} />
          <span className="text-sm text-zinc-500">
            {getStatusLabel(plant.status)}
          </span>
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <DetailRow icon={StickyNote} label="Species" value={plant.species || '—'} />
          <DetailRow icon={MapPin} label="Room" value={plant.room || '—'} />
          <DetailRow
            icon={Calendar}
            label="Next watering"
            value={formatDisplayDate(plant.nextWateringDate)}
          />
          <DetailRow
            icon={Calendar}
            label="Added"
            value={new Date(plant.createdAt).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          />
        </dl>

        {plant.notes && (
          <div className="mt-8 rounded-2xl border border-zinc-100/80 bg-white/50 p-5 backdrop-blur-sm">
            <h3 className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
              <StickyNote className="h-3.5 w-3.5" strokeWidth={2.25} />
              Notes
            </h3>
            <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-800">
              {plant.notes}
            </p>
          </div>
        )}
      </Card>

      <Link
        to={ROUTES.PLANTS}
        className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2.25} />
        Back to plants
      </Link>
    </>
  )
}
