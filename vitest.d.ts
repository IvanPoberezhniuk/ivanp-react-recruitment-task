import '@testing-library/jest-dom/vitest';

declare module '@vitejs/plugin-react' {
  import type { Plugin } from 'vite';
  export default function react(options?: any): Plugin;
}