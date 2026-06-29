const PLACEHOLDER_MARKERS = [
  'your-project-id',
  'your-anon-key',
  'your_supabase',
  'example.com',
]

function isPlaceholder(value) {
  if (!value) return true
  const lower = value.toLowerCase()
  return PLACEHOLDER_MARKERS.some((marker) => lower.includes(marker))
}

function isValidSupabaseUrl(url) {
  try {
    const parsed = new URL(url)
    return (
      parsed.protocol === 'https:' &&
      parsed.hostname.endsWith('.supabase.co')
    )
  } catch {
    return false
  }
}

export function getSupabaseEnv() {
  const url = import.meta.env.VITE_SUPABASE_URL?.trim() ?? ''
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() ?? ''

  const errors = []

  if (!url) {
    errors.push('VITE_SUPABASE_URL is missing.')
  } else if (isPlaceholder(url)) {
    errors.push('VITE_SUPABASE_URL still contains placeholder values.')
  } else if (!isValidSupabaseUrl(url)) {
    errors.push(
      'VITE_SUPABASE_URL must be a valid https://*.supabase.co project URL.',
    )
  }

  if (!anonKey) {
    errors.push('VITE_SUPABASE_ANON_KEY is missing.')
  } else if (isPlaceholder(anonKey)) {
    errors.push('VITE_SUPABASE_ANON_KEY still contains placeholder values.')
  } else if (anonKey.length < 20) {
    errors.push('VITE_SUPABASE_ANON_KEY looks invalid (too short).')
  }

  return {
    url,
    anonKey,
    isValid: errors.length === 0,
    errors,
  }
}
