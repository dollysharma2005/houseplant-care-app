export function toDateKey(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatDisplayDate(dateString) {
  if (!dateString) return '—'
  const [year, month, day] = dateString.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function groupPlantsByWateringDate(plants) {
  const map = new Map()

  for (const plant of plants) {
    if (!plant.nextWateringDate) continue
    const existing = map.get(plant.nextWateringDate) ?? []
    map.set(plant.nextWateringDate, [...existing, plant])
  }

  return map
}

export function getPlantsNeedingWater(plants) {
  const todayKey = toDateKey(new Date())
  const overdue = []
  const today = []

  for (const plant of plants) {
    if (!plant.nextWateringDate) continue

    if (plant.nextWateringDate < todayKey) {
      overdue.push(plant)
    } else if (plant.nextWateringDate === todayKey) {
      today.push(plant)
    }
  }

  overdue.sort((a, b) => a.nextWateringDate.localeCompare(b.nextWateringDate))
  today.sort((a, b) => a.plantName.localeCompare(b.plantName))

  return { overdue, today }
}
