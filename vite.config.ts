import { resolve } from 'path'
import { defineConfig } from 'vitest/config'
import dts from 'vite-plugin-dts'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true })],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts'
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'stepper-ui',
      fileName: 'stepper-ui'
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'react/jsx-runtime',
          clsx: 'clsx',
          'tailwind-merge': 'tailwind-merge'
        }
      }
    }
  }
})
