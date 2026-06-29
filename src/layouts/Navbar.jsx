import { NavLink, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { APP_NAME, ROUTES } from '../utils/constants'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/ui/Button'
import {
  IconCalendar,
  IconDashboard,
  IconLeaf,
  IconPlants,
  IconSignOut,
} from '../components/ui/Icons'

function getInitials(user) {
  const email = user?.email ?? ''
  const letter = email.charAt(0).toUpperCase()
  return letter || 'U'
}

function DesktopNavLink({ to, label, Icon }) {
  const reducedMotion = useReducedMotion()

  return (
    <NavLink to={to} className="relative px-1">
      {({ isActive }) => (
        <span
          className={`relative inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors ${
            isActive ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-800'
          }`}
        >
          <Icon className="h-4 w-4" strokeWidth={2.25} />
          {label}
          {isActive && (
            <motion.span
              layoutId="nav-underline"
              className="absolute inset-x-1 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-emerald-400"
              transition={
                reducedMotion
                  ? { duration: 0.1 }
                  : { type: 'spring', stiffness: 380, damping: 30 }
              }
            />
          )}
        </span>
      )}
    </NavLink>
  )
}

export default function Navbar() {
  const { signOut, user } = useAuth()
  const navigate = useNavigate()
  const initials = getInitials(user)

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate(ROUTES.LOGIN)
    } catch {
      navigate(ROUTES.LOGIN)
    }
  }

  const navItems = [
    { to: ROUTES.DASHBOARD, label: 'Dashboard', Icon: IconDashboard },
    { to: ROUTES.PLANTS, label: 'Plants', Icon: IconPlants },
    { to: ROUTES.CALENDAR, label: 'Calendar', Icon: IconCalendar },
  ]

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-5">
        <header className="nav-pill pointer-events-auto flex h-[4.25rem] w-full max-w-5xl items-center justify-between gap-4 px-4 sm:px-5">
          <NavLink to={ROUTES.DASHBOARD} className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 via-primary-600 to-emerald-600 text-white shadow-[0_8px_20px_rgba(22,163,74,0.35)] ring-1 ring-white/30">
              <IconLeaf className="h-5 w-5" strokeWidth={2.25} />
            </span>
            <span className="hidden font-display text-base font-bold tracking-tight text-zinc-900 sm:inline">
              {APP_NAME}
            </span>
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <DesktopNavLink key={item.to} {...item} />
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="hidden items-center gap-2 rounded-2xl border border-white/70 bg-white/50 px-2 py-1.5 sm:flex"
              title={user?.email ?? 'Account'}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-600 text-xs font-bold text-white shadow-sm">
                {initials}
              </span>
              <span className="max-w-[8rem] truncate text-xs font-medium text-zinc-600">
                {user?.email ?? 'Account'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSignOut}
              className="hidden sm:inline-flex"
            >
              <IconSignOut className="h-4 w-4" strokeWidth={2.25} />
              Sign out
            </Button>
          </div>
        </header>
      </div>

      <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 md:hidden">
        <div className="nav-pill pointer-events-auto flex w-full max-w-md items-center gap-1 p-1.5 pb-[max(0.25rem,env(safe-area-inset-bottom))]">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink key={to} to={to} className="flex-1">
              {({ isActive }) => (
                <span
                  className={`flex flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-semibold transition-all ${
                    isActive
                      ? 'bg-white/80 text-primary-700 shadow-sm'
                      : 'text-zinc-500'
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                  {label}
                </span>
              )}
            </NavLink>
          ))}
          <button
            type="button"
            onClick={handleSignOut}
            className="flex flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-2 text-[10px] font-semibold text-zinc-500"
          >
            <IconSignOut className="h-5 w-5" strokeWidth={2} />
            Sign out
          </button>
        </div>
      </nav>
    </>
  )
}
