import alias from '@rollup/plugin-alias'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import { configDefaults, defineConfig } from 'vitest/config'

const projectRootDir = path.resolve(__dirname)
const resolve = (p: string) => path.resolve(projectRootDir, p)

export default defineConfig({
  plugins: [
    alias({
      entries: [
        {
          find: '@',
          replacement: resolve('src'),
        },
      ],
    }),
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
