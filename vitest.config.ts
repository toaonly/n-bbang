import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

const projectRootDir = path.resolve(__dirname)
const resolve = (p: string) => path.resolve(projectRootDir, p)

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve('src'),
      },
    ],
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    vueJsx(),
  ],
  test: {
    exclude: [...configDefaults.exclude],
    globals: true,
    environment: 'happy-dom',
  },
})
