import { fileURLToPath, URL } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'

export default mergeConfig(
  defineConfig({
    test: {
      coverage: {
        provider: 'v8'
      },
      globals: true,
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./tests', import.meta.url))
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
  })
)
