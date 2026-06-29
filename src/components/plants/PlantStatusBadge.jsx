import { getStatusLabel } from '../../utils/plantUtils'

const styles = {
  healthy:
    'border-emerald-200/80 bg-emerald-50/80 text-emerald-800 ring-emerald-500/15',
  needs_water:
    'border-amber-200/80 bg-amber-50/80 text-amber-800 ring-amber-500/15',
  overdue: 'border-red-200/80 bg-red-50/80 text-red-800 ring-red-500/15',
}

export default function PlantStatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 backdrop-blur-sm ${
        styles[status] ?? 'border-zinc-200/80 bg-zinc-100/80 text-zinc-700 ring-zinc-500/10'
      }`}
    >
      {getStatusLabel(status)}
    </span>
  )
}
