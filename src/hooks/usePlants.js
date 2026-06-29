import { useCallback, useEffect, useState } from 'react'
import {
  createPlant,
  deletePlant,
  fetchPlantById,
  fetchPlants,
  togglePlantFavorite,
  updatePlant,
} from '../services/plantsService'
import { useAuth } from './useAuth'

export function usePlants() {
  const { user } = useAuth()
  const [plants, setPlants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPlants = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError('')

    try {
      const data = await fetchPlants(user.id)
      setPlants(data)
    } catch (err) {
      setError(err.message ?? 'Failed to load plants.')
      setPlants([])
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    if (!user) return undefined

    let cancelled = false

    void (async () => {
      try {
        const data = await fetchPlants(user.id)
        if (!cancelled) {
          setPlants(data)
          setError('')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Failed to load plants.')
          setPlants([])
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [user])

  const addPlant = async (plant) => {
    const created = await createPlant(plant, user.id)
    setPlants((current) => [created, ...current])
    return created
  }

  const editPlant = async (id, plant) => {
    const updated = await updatePlant(id, plant, user.id)
    setPlants((current) =>
      current.map((item) => (item.id === id ? updated : item)),
    )
    return updated
  }

  const removePlant = async (id) => {
    await deletePlant(id, user.id)
    setPlants((current) => current.filter((item) => item.id !== id))
  }

  const toggleFavorite = async (id, isFavorite) => {
    const updated = await togglePlantFavorite(id, isFavorite, user.id)
    setPlants((current) =>
      current.map((item) => (item.id === id ? updated : item)),
    )
    return updated
  }

  return {
    plants,
    loading,
    error,
    reload: loadPlants,
    addPlant,
    editPlant,
    removePlant,
    toggleFavorite,
  }
}

export function usePlant(id) {
  const { user } = useAuth()
  const [plant, setPlant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPlant = useCallback(async () => {
    if (!user || !id) return

    setLoading(true)
    setError('')

    try {
      const data = await fetchPlantById(id, user.id)
      setPlant(data)
      if (!data) setError('Plant not found.')
    } catch (err) {
      setError(err.message ?? 'Failed to load plant.')
      setPlant(null)
    } finally {
      setLoading(false)
    }
  }, [user, id])

  useEffect(() => {
    if (!user || !id) return undefined

    let cancelled = false

    void (async () => {
      try {
        const data = await fetchPlantById(id, user.id)
        if (!cancelled) {
          setPlant(data)
          setError(data ? '' : 'Plant not found.')
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message ?? 'Failed to load plant.')
          setPlant(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [user, id])

  return { plant, loading, error, reload: loadPlant }
}
