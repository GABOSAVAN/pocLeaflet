
// @ts-ignore
import { BrowserMultiFormatReader } from '@zxing/browser';
import * as PDF417 from 'pdf417-generator';

export function usePdf417() {
  const reader = new BrowserMultiFormatReader();
  let currentStream: MediaStream | null = null;

  const isMobileDevice = (): boolean => {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  };

  const getBackCameraDeviceId = async (): Promise<string | null> => {
    const devices = await BrowserMultiFormatReader.listVideoInputDevices();

    if (isMobileDevice()) {
      // Buscar cámara trasera por etiqueta
      const backCamera = devices.find(device =>
        /back|rear|environment/i.test(device.label)
      );
      return backCamera?.deviceId || devices[0]?.deviceId || null;
    }

    // En desktop, usar la primera disponible
    return devices[0]?.deviceId || null;
  };

  const requestCameraAccess = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop()); // Cerramos inmediatamente
    } catch (error) {
      console.error('Permiso de cámara denegado o error:', error);
      throw new Error('No se pudo acceder a la cámara');
    }
  };

  const startCamera = async (
    videoElement: HTMLVideoElement,
    onResult: (result: string) => void
  ) => {
    await requestCameraAccess(); // Solicita permisos

    const deviceId = await getBackCameraDeviceId();

    if (!deviceId) {
      console.warn('No se encontró cámara disponible');
      return;
    }

    await reader.decodeFromVideoDevice(deviceId, videoElement, (result, error, controls) => {
      if (result) {
        onResult(result.getText());
        setTimeout(() => stopCamera(), 100); // Evita error de strict mode
      }
    });
  };

  const stopCamera = () => {
    try {
      // reader.reset(); 
      console.log('TODO: Deteniendo la cámara y liberando recursos');
    } catch (error) {
      console.warn('Error al detener la cámara:', error);
    }
  };

  const encodeTextToPdf417 = (text: string): string => {
    const canvas = document.createElement('canvas');
    const code = PDF417.encode(text);
    PDF417.draw(code, canvas);
    return canvas.toDataURL();
  };

  return {
    startCamera,
    stopCamera,
    encodeTextToPdf417
  };
}
