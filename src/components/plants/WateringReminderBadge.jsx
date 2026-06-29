const labels = {
  today: 'Today',
  overdue: 'Overdue',
}

const styles = {
  today:
    'border-amber-200/80 bg-amber-50/90 text-amber-800 ring-amber-500/20 shadow-[0_0_20px_-4px_rgba(245,158,11,0.35)]',
  overdue:
    'border-red-200/80 bg-red-50/90 text-red-800 ring-red-500/20 shadow-[0_0_20px_-4px_rgba(239,68,68,0.35)]',
}

export default function WateringReminderBadge({ type }) {
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ring-1 backdrop-blur-sm ${styles[type]}`}
    >
      {labels[type]}
    </span>
  )
}
