import { supabase } from './supabaseClient'

function assertClient() {
  if (!supabase) {
    throw new Error('Supabase is not configured.')
  }
  return supabase
}

function mapPlant(row) {
  if (!row) return null
  return {
    id: row.id,
    userId: row.user_id,
    plantName: row.plant_name,
    species: row.species ?? '',
    room: row.room ?? '',
    status: row.status,
    notes: row.notes ?? '',
    isFavorite: Boolean(row.is_favorite),
    nextWateringDate: row.next_watering_date ?? '',
    createdAt: row.created_at,
  }
}

function toDbPayload(plant, userId) {
  return {
    user_id: userId,
    plant_name: plant.plantName.trim(),
    species: plant.species?.trim() || null,
    room: plant.room?.trim() || null,
    status: plant.status,
    notes: plant.notes?.trim() || null,
    next_watering_date: plant.nextWateringDate || null,
  }
}

export async function fetchPlants(userId) {
  const client = assertClient()
  const { data, error } = await client
    .from('plants')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data.map(mapPlant)
}

export async function fetchPlantById(id, userId) {
  const client = assertClient()
  const { data, error } = await client
    .from('plants')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .maybeSingle()

  if (error) throw error
  return mapPlant(data)
}

export async function createPlant(plant, userId) {
  const client = assertClient()
  const { data, error } = await client
    .from('plants')
    .insert(toDbPayload(plant, userId))
    .select('*')
    .single()

  if (error) throw error
  return mapPlant(data)
}

export async function updatePlant(id, plant, userId) {
  const client = assertClient()
  const { data, error } = await client
    .from('plants')
    .update({
      plant_name: plant.plantName.trim(),
      species: plant.species?.trim() || null,
      room: plant.room?.trim() || null,
      status: plant.status,
      notes: plant.notes?.trim() || null,
      next_watering_date: plant.nextWateringDate || null,
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select('*')
    .single()

  if (error) throw error
  return mapPlant(data)
}

export async function deletePlant(id, userId) {
  const client = assertClient()
  const { error } = await client
    .from('plants')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)

  if (error) throw error
}

export async function togglePlantFavorite(id, isFavorite, userId) {
  const client = assertClient()
  const { data, error } = await client
    .from('plants')
    .update({ is_favorite: isFavorite })
    .eq('id', id)
    .eq('user_id', userId)
    .select('*')
    .single()

  if (error) throw error
  return mapPlant(data)
}
