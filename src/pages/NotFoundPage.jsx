import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'
import EmptyState from '../components/ui/EmptyState'
import { ROUTES } from '../utils/constants'

export default function NotFoundPage() {
  return (
    <div className="app-shell flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg">
        <EmptyState
          title="Page not found"
          description="The page you are looking for does not exist or has been moved."
          action={
            <Link to={ROUTES.HOME}>
              <Button>Go home</Button>
            </Link>
          }
        />
      </div>
    </div>
  )
}
