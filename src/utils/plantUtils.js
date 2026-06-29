import { PLANT_STATUS_OPTIONS } from './constants'

export function getStatusLabel(status) {
  const match = PLANT_STATUS_OPTIONS.find((option) => option.value === status)
  return match?.label ?? status
}

export function filterPlants(
  plants,
  { search = '', status = '', favoritesOnly = false } = {},
) {
  const normalizedSearch = search.trim().toLowerCase()

  return plants.filter((plant) => {
    const matchesSearch =
      !normalizedSearch ||
      plant.plantName.toLowerCase().includes(normalizedSearch)

    const matchesStatus = !status || plant.status === status

    const matchesFavorites = !favoritesOnly || plant.isFavorite

    return matchesSearch && matchesStatus && matchesFavorites
  })
}

export function getFavoritePlants(plants) {
  return plants.filter((plant) => plant.isFavorite)
}

export function getPlantStats(plants) {
  return plants.reduce(
    (stats, plant) => {
      stats.total += 1
      if (plant.status in stats.byStatus) {
        stats.byStatus[plant.status] += 1
      }
      return stats
    },
    {
      total: 0,
      byStatus: {
        healthy: 0,
        needs_water: 0,
        overdue: 0,
      },
    },
  )
}
