import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from 'path'
import analyze from 'rollup-plugin-analyzer'
import { defineConfig, loadEnv } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'
import svgLoader from 'vite-svg-loader'

const projectRootDir = path.resolve(__dirname)
const resolve = (p: string) => path.resolve(projectRootDir, p)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''))

  return {
    resolve: {
      alias: [
        {
          find: '@',
          replacement: resolve('src'),
        },
      ],
    },
    plugins: [
      analyze({
        showExports: true,
        skipFormatted: true,
        summaryOnly: true,
      }),
      svgLoader({
        defaultImport: 'raw',
      }),
      eslintPlugin({
        cache: false,
      }),
      vue({
        reactivityTransform: true,
      }),
      vueJsx(),
    ],
  }
})
