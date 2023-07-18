import { createRouter, createWebHistory } from 'vue-router'
import UserAuth from '@/views/UserAuth.vue'
import StationSelector from '@/views/StationSelector.vue'
import QRScannerCamera from '@/components/RoomCheckIn/Scanner/ScannerCamera.vue'
import QRScannedStats from '@/components/RoomCheckIn/Stats/ScannedStats.vue'
import Scanner from '@/views/Scanner.vue'
import Registration from '@/views/Registration.vue'
import RegistrationKiosk from '@/components/Registration/Kiosk/ScannerCamera.vue'
import RegistrationStats from '@/components/Registration/Stats/RegistrationStats.vue'
import RegistrationHybrid from '@/components/Registration/Hybrid/ScanSearch.vue'
import NotFound from '@/views/NotFound.vue'
import AuthTemplate from '@/AuthTemplate.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'userAuth',
      component: UserAuth
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthTemplate,
      children: [
        {
          path: 'station-selector',
          name: 'stationSelector',
          component: StationSelector
        },
        {
          path: ':eventId/registration/:registrationType',
          name: 'registration',
          redirect: { name: 'registerKiosk' },
          component: Registration,
          children: [
            {
              path: 'kiosk',
              name: 'registerKiosk',
              component: RegistrationKiosk
            },
            {
              path: 'hybrid',
              name: 'registerHybrid',
              component: RegistrationHybrid
            },
            {
              path: 'stats',
              name: 'registrationStats',
              component: RegistrationStats
            }
          ]
        },
        {
          path: ':roomId/scanner/:scannerType',
          name: 'roomScanner',
          redirect: { name: 'scannerCamera' },
          component: Scanner,
          children: [
            {
              path: 'scanner',
              name: 'scannerCamera',
              component: QRScannerCamera
            },
            {
              path: 'stats',
              name: 'scannerStats',
              component: QRScannedStats
            }
          ]
        }
      ]
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})

export default router
