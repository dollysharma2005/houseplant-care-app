export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PLANTS: '/plants',
  CALENDAR: '/calendar',
  PLANT_NEW: '/plants/new',
  PLANT_DETAIL: (id) => `/plants/${id}`,
  PLANT_EDIT: (id) => `/plants/${id}/edit`,
}

export const DEFAULT_WATERING_INTERVAL_DAYS = 7

export const APP_NAME = 'HomePlant'

export const PLANT_STATUSES = {
  HEALTHY: 'healthy',
  NEEDS_WATER: 'needs_water',
  OVERDUE: 'overdue',
}

export const PLANT_STATUS_OPTIONS = [
  { value: PLANT_STATUSES.HEALTHY, label: 'Healthy' },
  { value: PLANT_STATUSES.NEEDS_WATER, label: 'Needs water' },
  { value: PLANT_STATUSES.OVERDUE, label: 'Overdue' },
]
