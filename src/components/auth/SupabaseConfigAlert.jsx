import Alert from '../ui/Alert'
import { useAuth } from '../../hooks/useAuth'

export default function SupabaseConfigAlert() {
  const { isConfigured, envErrors } = useAuth()

  if (isConfigured) return null

  return (
    <Alert variant="warning" className="mt-4">
      <p>
        Supabase is not configured. Copy <code>.env.example</code> to{' '}
        <code>.env</code> and add your project credentials.
      </p>
      {envErrors.length > 0 && (
        <ul className="mt-2 list-inside list-disc space-y-1">
          {envErrors.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      )}
      <p className="mt-2">
        Then run the SQL migration and verify with{' '}
        <code>npm run verify:supabase</code>.
      </p>
    </Alert>
  )
}
