// @ts-ignore
import { BrowserMultiFormatReader } from '@zxing/browser';
import * as PDF417 from 'pdf417-generator';

export function usePdf417() {
  const reader = new BrowserMultiFormatReader();
  let videoInputDeviceId: string | null = null;

  const startCamera = async (
    videoElement: HTMLVideoElement,
    onResult: (result: string) => void
  ) => {
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
    console.log('TODO: Stopping camera');
    // reader.scan.arguments[0]?.stop();
  };

  const encodeTextToPdf417 = (text: string): string => {
    const canvas = document.createElement('canvas');
    const code = PDF417.encode(text); // Codifica el texto
    
    console.log("codigo:  ", code);
    PDF417.draw(code, canvas);        // Dibuja el código en el canvas
    return canvas.toDataURL();        // Devuelve la imagen en base64
  };

  return {
    startCamera,
    stopCamera,
    encodeTextToPdf417
  };
}
