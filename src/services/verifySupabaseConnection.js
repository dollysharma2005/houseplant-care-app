import { createClient } from '@supabase/supabase-js'
import { getSupabaseEnv } from '../utils/env'
import { supabase } from './supabaseClient'

export async function verifySupabaseConnection(client = supabase) {
  const env = getSupabaseEnv()

  if (!env.isValid) {
    return {
      ok: false,
      step: 'environment',
      message: 'Supabase environment variables are invalid or missing.',
      errors: env.errors,
    }
  }

  if (!client) {
    return {
      ok: false,
      step: 'client',
      message: 'Supabase client was not initialized.',
      errors: ['Client is null despite valid environment variables.'],
    }
  }

  const { error: authError } = await client.auth.getSession()
  if (authError) {
    return {
      ok: false,
      step: 'auth',
      message: 'Failed to reach Supabase Auth.',
      errors: [authError.message],
    }
  }

  const { error: plantsError } = await client
    .from('plants')
    .select('id', { count: 'exact', head: true })

  if (plantsError) {
    const missingTable =
      plantsError.code === '42P01' ||
      plantsError.code === 'PGRST205' ||
      plantsError.message?.includes('does not exist')

    const hint = missingTable
      ? 'The plants table does not exist. Run supabase/migrations/001_initial_schema.sql in the Supabase SQL Editor.'
      : plantsError.code === 'PGRST301'
        ? 'JWT/API key rejected. Check VITE_SUPABASE_ANON_KEY in your .env file.'
        : null

    return {
      ok: false,
      step: 'database',
      message: 'Connected to Supabase, but the database schema check failed.',
      errors: [plantsError.message],
      hint,
    }
  }

  const { error: profilesError } = await client
    .from('profiles')
    .select('id', { count: 'exact', head: true })

  if (profilesError) {
    const missingTable =
      profilesError.code === '42P01' ||
      profilesError.code === 'PGRST205' ||
      profilesError.message?.includes('does not exist')

    const hint = missingTable
      ? 'The profiles table does not exist. Run supabase/migrations/001_initial_schema.sql in the Supabase SQL Editor.'
      : null

    return {
      ok: false,
      step: 'database',
      message: 'Connected to Supabase, but the profiles table check failed.',
      errors: [profilesError.message],
      hint,
    }
  }

  return {
    ok: true,
    step: 'complete',
    message: 'Supabase connection and schema verified successfully.',
    projectUrl: env.url,
  }
}

export async function verifySupabaseConnectionWithCredentials(url, anonKey) {
  const client = createClient(url, anonKey)
  return verifySupabaseConnection(client)
}
