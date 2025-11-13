import { ref } from 'vue'

export function useLocationUser() {
  const coords = ref<{ lat: number; lng: number } | null>(null)
  const deviceType = ref<'mobile' | 'desktop'>('desktop')
  const permissionGranted = ref(false)
  const locationDetails = ref<string>('')

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
        async (position) => {
          coords.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          permissionGranted.value = true
          await fetchLocationDetails()
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

  const fetchLocationDetails = async () => {
    if (!coords.value) return

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.value.lat}&lon=${coords.value.lng}`
      )
      const data = await response.json()
      const { address } = data

      locationDetails.value = `
        ${address.road || ''}, ${address.city || address.town || address.village || ''}, 
        ${address.state || ''}, ${address.country || ''} 
        ${address.postcode ? ' - ' + address.postcode : ''}
      `.trim()
    } catch (error) {
      console.error('Error al obtener dirección:', error)
      locationDetails.value = 'No se pudo obtener la dirección.'
    }
  }

  return {
    coords,
    deviceType,
    permissionGranted,
    locationDetails,
    detectDeviceType,
    requestLocationPermission
  }
}