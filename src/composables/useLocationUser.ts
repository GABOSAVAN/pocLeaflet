import { ref } from 'vue'

export function useLocationUser() {
  const coords = ref<{ lat: number; lng: number } | null>(null)
  const deviceType = ref<'mobile' | 'desktop'>('desktop')
  const permissionGranted = ref(false)

  const detectDeviceType = () => {
    const userAgent = navigator.userAgent || navigator.vendor
    deviceType.value = /android|iphone|ipad|mobile/i.test(userAgent) ? 'mobile' : 'desktop'
  }

  const requestLocationPermission = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        console.warn('Geolocalización no soportada')
        resolve(false)
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          coords.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          permissionGranted.value = true
          resolve(true)
        },
        (error) => {
          console.error('Error al obtener ubicación:', error)
          permissionGranted.value = false
          resolve(false)
        }
      )
    })
  }

  return {
    coords,
    deviceType,
    permissionGranted,
    detectDeviceType,
    requestLocationPermission
  }
}