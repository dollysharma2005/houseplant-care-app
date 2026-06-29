import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import FadeIn from '../components/motion/FadeIn'
import PageTransition from '../components/motion/PageTransition'
import { IconLeaf } from '../components/ui/Icons'
import { APP_NAME } from '../utils/constants'

export default function AuthLayout() {
  const location = useLocation()

  return (
    <div className="app-shell relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div
        className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-primary-300/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-16 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl"
        aria-hidden="true"
      />

      <FadeIn className="relative mb-10 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-gradient-to-br from-primary-500 via-primary-600 to-emerald-600 text-white shadow-[0_16px_40px_rgba(22,163,74,0.35)] ring-1 ring-white/40">
          <IconLeaf className="h-8 w-8" strokeWidth={2} />
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-gradient">
          {APP_NAME}
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-zinc-500 sm:text-base">
          Track your houseplants and watering schedule with clarity.
        </p>
      </FadeIn>

      <div className="relative w-full max-w-md">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </div>
    </div>
  )
}
