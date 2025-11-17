
declare module 'vite-plugin-commonjs' {
  const plugin: () => import('vite').Plugin;
  export default plugin;
}
