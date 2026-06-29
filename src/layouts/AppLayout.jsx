import { AnimatePresence } from 'framer-motion'
import { Outlet, useLocation } from 'react-router-dom'
import PageTransition from '../components/motion/PageTransition'
import Navbar from './Navbar'

export default function AppLayout() {
  const location = useLocation()

  return (
    <div className="app-shell">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pb-32 pt-28 sm:px-6 md:pb-8 md:pt-32">
        <AnimatePresence mode="wait">
          <PageTransition key={location.pathname}>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
      </main>
    </div>
  )
}
