import { ref } from 'vue'
import Tesseract from 'tesseract.js'

export function useOcr() {
  const deviceType = ref<'desktop' | 'android' | 'ios'>('desktop')
  const hasCamera = ref(false)
  const videoStream = ref<MediaStream | null>(null)
  const ocrResult = ref<string>('')
  const processing = ref(false)

  const detectDeviceType = () => {
    const ua = navigator.userAgent.toLowerCase()
    if (/android/.test(ua)) deviceType.value = 'android'
    else if (/iphone|ipad|ipod/.test(ua)) deviceType.value = 'ios'
    else deviceType.value = 'desktop'
  }

  const checkCameraAvailability = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      hasCamera.value = devices.some(device => device.kind === 'videoinput')
    } catch (error) {
      console.error('Error al verificar cámaras:', error)
      hasCamera.value = false
    }
  }

  const startCamera = async (videoElement: HTMLVideoElement) => {
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: deviceType.value !== 'desktop' ? 'environment' : 'user'
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      videoStream.value = stream
      videoElement.srcObject = stream
      await videoElement.play()
    } catch (error) {
      console.error('Error al iniciar la cámara:', error)
    }
  }

  const scanFrame = async (videoElement: HTMLVideoElement) => {
    if (!videoElement || !videoStream.value) return

    const canvas = document.createElement('canvas')
    canvas.width = videoElement.videoWidth
    canvas.height = videoElement.videoHeight
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
    const imageData = canvas.toDataURL('image/png')

    processing.value = true
    try {
      const result = await Tesseract.recognize(imageData, 'eng', {
        logger: m => console.log(m)
      })
      ocrResult.value = result.data.text
    } catch (error) {
      console.error('Error en OCR:', error)
    } finally {
      processing.value = false
      stopCamera()
    }
  }

  const stopCamera = () => {
    if (videoStream.value) {
      videoStream.value.getTracks().forEach(track => track.stop())
      videoStream.value = null
    }
  }

  return {
    deviceType,
    hasCamera,
    ocrResult,
    processing,
    detectDeviceType,
    checkCameraAvailability,
    startCamera,
    scanFrame,
    stopCamera
  }
}