export function getDaysSince(dateString) {
  if (!dateString) return null
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  return Math.floor(diffMs / (1000 * 60 * 60 * 24))
}

export function getWateringStatus(lastWateredAt, intervalDays, fallbackDate) {
  const referenceDate = lastWateredAt ?? fallbackDate
  if (!referenceDate) {
    return { status: 'unknown', label: 'Never watered', daysSince: null }
  }

  const daysSince = getDaysSince(referenceDate)
  if (daysSince === null) {
    return { status: 'unknown', label: 'Never watered', daysSince: null }
  }

  if (daysSince > intervalDays) {
    const overdueBy = daysSince - intervalDays
    return {
      status: 'overdue',
      label: overdueBy === 1 ? '1 day overdue' : `${overdueBy} days overdue`,
      daysSince,
    }
  }

  if (daysSince >= intervalDays - 1) {
    return { status: 'due-soon', label: 'Due soon', daysSince }
  }

  const daysUntilDue = intervalDays - daysSince
  return {
    status: 'ok',
    label:
      daysUntilDue === 1
        ? 'Water in 1 day'
        : `Water in ${daysUntilDue} days`,
    daysSince,
  }
}
