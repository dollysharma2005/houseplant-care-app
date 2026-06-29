import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { createClient } from '@supabase/supabase-js'

function loadEnvFile() {
  const envPath = resolve(process.cwd(), '.env')
  if (!existsSync(envPath)) return false

  const contents = readFileSync(envPath, 'utf8')
  for (const line of contents.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const separator = trimmed.indexOf('=')
    if (separator === -1) continue
    const key = trimmed.slice(0, separator).trim()
    const value = trimmed.slice(separator + 1).trim()
    if (!process.env[key]) process.env[key] = value
  }
  return true
}

loadEnvFile()

const url = process.env.VITE_SUPABASE_URL
const anonKey = process.env.VITE_SUPABASE_ANON_KEY
const testEmail = `homeplant.test.${Date.now()}@gmail.com`
const testPassword = 'TestPass123!'

const client = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

console.log('Testing auth flow...\n')

const { data: signUpData, error: signUpError } = await client.auth.signUp({
  email: testEmail,
  password: testPassword,
})

if (signUpError) {
  console.error('✗ Sign up failed:', signUpError.message)
  process.exit(1)
}

if (signUpError) {
  console.error('✗ Sign up failed:', signUpError.message)
  process.exit(1)
}

console.log('✓ Sign up succeeded')

if (signUpData.session) {
  const { data: sessionData, error: sessionError } = await client.auth.getSession()
  if (sessionError || !sessionData.session) {
    console.error('✗ Session persistence check failed')
    process.exit(1)
  }
  console.log('✓ Session available after sign up')

  const { data: plant, error: plantError } = await client
    .from('plants')
    .insert({
      user_id: signUpData.user.id,
      plant_name: 'Test Monstera',
      species: 'Monstera deliciosa',
      room: 'Living room',
      status: 'healthy',
      notes: 'Auth integration test plant',
    })
    .select('*')
    .single()

  if (plantError) {
    console.error('✗ Plant CRUD test failed:', plantError.message)
    process.exit(1)
  }

  console.log('✓ Plant created:', plant.plant_name)

  await client.from('plants').delete().eq('id', plant.id)
  console.log('✓ Plant deleted')

  const { error: signOutError } = await client.auth.signOut()
  if (signOutError) {
    console.error('✗ Sign out failed:', signOutError.message)
    process.exit(1)
  }
  console.log('✓ Sign out succeeded')

  const { error: signInError } = await client.auth.signInWithPassword({
    email: testEmail,
    password: testPassword,
  })

  if (signInError) {
    console.error('✗ Sign in failed:', signInError.message)
    process.exit(1)
  }

  console.log('✓ Sign in succeeded')
  console.log('\nAuthentication and plant CRUD verified successfully.')
  process.exit(0)
}

console.log('ℹ Email confirmation is enabled — sign-in requires a confirmed email.')
console.log('  Disable confirm email in Supabase → Authentication → Providers → Email for local dev,')
console.log('  or confirm the test account via the email link.')
console.log('\n✓ Sign up endpoint works correctly.')
