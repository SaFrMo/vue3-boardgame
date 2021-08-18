import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'lib/index.ts'),
            name: 'Vue3Boardgame',
            fileName: (format) => `vue3-boardgame.${format}.js`
        },
        rollupOptions: {
            // externalized deps that shouldn't be bundled
            external: ['vue', 'boardgame.io'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    vue: 'Vue'
                }
            }
        }
    }
})
