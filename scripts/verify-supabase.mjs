import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { createClient } from '@supabase/supabase-js'

function loadEnvFile() {
  const envPath = resolve(process.cwd(), '.env')
  if (!existsSync(envPath)) {
    return false
  }

  const contents = readFileSync(envPath, 'utf8')
  for (const line of contents.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const separator = trimmed.indexOf('=')
    if (separator === -1) continue
    const key = trimmed.slice(0, separator).trim()
    const value = trimmed.slice(separator + 1).trim()
    if (!process.env[key]) {
      process.env[key] = value
    }
  }

  return true
}

function validateEnv() {
  const url = process.env.VITE_SUPABASE_URL?.trim() ?? ''
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY?.trim() ?? ''
  const errors = []

  if (!url) errors.push('VITE_SUPABASE_URL is missing.')
  if (!anonKey) errors.push('VITE_SUPABASE_ANON_KEY is missing.')

  if (url.includes('your-project-id')) {
    errors.push('VITE_SUPABASE_URL still contains placeholder values.')
  }

  if (anonKey.includes('your-anon-key')) {
    errors.push('VITE_SUPABASE_ANON_KEY still contains placeholder values.')
  }

  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:' || !parsed.hostname.endsWith('.supabase.co')) {
      errors.push('VITE_SUPABASE_URL must be https://<project-ref>.supabase.co')
    }
  } catch {
    if (url) errors.push('VITE_SUPABASE_URL is not a valid URL.')
  }

  return { url, anonKey, isValid: errors.length === 0, errors }
}

async function verifyConnection(url, anonKey) {
  const client = createClient(url, anonKey)

  const { error: authError } = await client.auth.getSession()
  if (authError) {
    return {
      ok: false,
      step: 'auth',
      message: authError.message,
    }
  }

  for (const table of ['profiles', 'plants']) {
    const { error } = await client.from(table).select('id', { head: true, count: 'exact' })
    if (error) {
      return {
        ok: false,
        step: 'database',
        table,
        message: error.message,
        code: error.code,
      }
    }
  }

  return { ok: true }
}

function printFailure(title, details) {
  console.error(`\n✗ ${title}`)
  for (const detail of details) {
    console.error(`  - ${detail}`)
  }
}

const envLoaded = loadEnvFile()
const env = validateEnv()

console.log('HomePlant — Supabase connection check\n')

if (!envLoaded) {
  printFailure('Environment file missing', [
    'Create a .env file in the project root.',
    'Copy .env.example and paste your Supabase project credentials.',
  ])
  process.exit(1)
}

if (!env.isValid) {
  printFailure('Environment variables invalid', env.errors)
  console.error('\nUpdate .env with values from: Supabase Dashboard → Project Settings → API')
  process.exit(1)
}

console.log(`Project URL: ${env.url}`)
console.log('Anon key: configured')

const result = await verifyConnection(env.url, env.anonKey)

if (!result.ok) {
  printFailure(`Connection failed at step: ${result.step}`, [result.message])

  if (result.code === '42P01' || result.code === 'PGRST205' || result.message?.includes('does not exist')) {
    console.error('\nRun this migration in Supabase Dashboard → SQL Editor:')
    console.error('  supabase/migrations/001_initial_schema.sql')
  }

  if (result.step === 'auth' && result.message.toLowerCase().includes('invalid')) {
    console.error('\nCheck VITE_SUPABASE_ANON_KEY matches the anon public key in your project API settings.')
  }

  process.exit(1)
}

console.log('\n✓ Supabase Auth reachable')
console.log('✓ profiles table accessible')
console.log('✓ plants table accessible')
console.log('\nSupabase backend is configured correctly.')
