
declare module 'pdf417-generator' {
  export function encode(text: string): any;
  export function draw(code: any, canvas: HTMLCanvasElement): void;
}
