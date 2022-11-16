import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { SchemaOrg } from '@vueuse/schema-org-vite';

export default defineConfig({
  plugins: [
    vue({
      template: {
        ssr: true,
        compilerOptions: {},
      },
    }),
    SchemaOrg(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
