import { createClient } from '@supabase/supabase-js'
import { getSupabaseEnv } from '../utils/env'

const env = getSupabaseEnv()

export const isSupabaseConfigured = env.isValid
export const supabaseEnvErrors = env.errors

export const supabase = isSupabaseConfigured
  ? createClient(env.url, env.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null
