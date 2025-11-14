
import { BrowserMultiFormatReader } from '@zxing/browser';
import * as PDF417 from 'pdf417-generator';

export function usePdf417() {
  const reader = new BrowserMultiFormatReader();
  let videoInputDeviceId: string | null = null;

  const startCamera = async (videoElement: HTMLVideoElement, onResult: (result: string) => void) => {
    const devices = await BrowserMultiFormatReader.listVideoInputDevices();
    videoInputDeviceId = devices[0]?.deviceId || null;

    if (videoInputDeviceId) {
      await reader.decodeFromVideoDevice(videoInputDeviceId, videoElement, (result, error) => {
        if (result) {
          onResult(result.getText());
          stopCamera(); // Detenemos la cámara al obtener resultado
        }
      });
    }
  };

  const stopCamera = () => {
    reader.reset(); // Este método es válido porque BrowserMultiFormatReader hereda de BrowserCodeReader
  };

  const encodeTextToPdf417 = (text: string): string => {
    const pdf417 = new PDF417();
    pdf417.init(text);
    const canvas = document.createElement('canvas');
    pdf417.render(canvas, 2); // 2 es el factor de escala
    return canvas.toDataURL(); // Devuelve la imagen en base64
  };

  return {
    startCamera,
    stopCamera,
    encodeTextToPdf417
  };
}
