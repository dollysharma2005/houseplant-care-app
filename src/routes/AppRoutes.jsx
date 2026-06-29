import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from '../layouts/AppLayout'
import AuthLayout from '../layouts/AuthLayout'
import GuestRoute from '../layouts/GuestRoute'
import ProtectedRoute from '../layouts/ProtectedRoute'
import RootRedirect from '../layouts/RootRedirect'
import AddPlantPage from '../pages/AddPlantPage'
import CalendarPage from '../pages/CalendarPage'
import DashboardPage from '../pages/DashboardPage'
import EditPlantPage from '../pages/EditPlantPage'
import LoginPage from '../pages/LoginPage'
import NotFoundPage from '../pages/NotFoundPage'
import PlantDetailPage from '../pages/PlantDetailPage'
import PlantsPage from '../pages/PlantsPage'
import RegisterPage from '../pages/RegisterPage'
import { ROUTES } from '../utils/constants'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<RootRedirect />} />

        <Route
          element={
            <GuestRoute>
              <AuthLayout />
            </GuestRoute>
          }
        >
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.PLANTS} element={<PlantsPage />} />
          <Route path={ROUTES.CALENDAR} element={<CalendarPage />} />
          <Route path={ROUTES.PLANT_NEW} element={<AddPlantPage />} />
          <Route path="/plants/:id" element={<PlantDetailPage />} />
          <Route path="/plants/:id/edit" element={<EditPlantPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
