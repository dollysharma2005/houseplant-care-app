import { useEffect } from 'react'
import { AuthProvider } from './contexts/AuthContext.jsx'
import AppRoutes from './routes/AppRoutes'
import { verifySupabaseConnection } from './services/verifySupabaseConnection'

export default function App() {
  useEffect(() => {
    if (!import.meta.env.DEV) return

    verifySupabaseConnection().then((result) => {
      if (result.ok) {
        console.info('[HomePlant]', result.message)
        return
      }

      console.warn('[HomePlant] Supabase check failed:', result.message)
      if (result.errors?.length) {
        for (const err of result.errors) {
          console.warn('  -', err)
        }
      }
      if (result.hint) {
        console.warn('  Hint:', result.hint)
      }
    })
  }, [])

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
