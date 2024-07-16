import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import purgecss from 'vite-plugin-purgecss';

import postcss from 'postcss';

export default defineConfig({
  plugins: [
    react(),
    purgecss(), // Purge unused CSS
    {
      name: 'postcss',
      enforce: 'pre',
      transformIndexHtml(html) {
        return html;
      },
      apply: 'build',
      transform(code, id) {
        if (!id.endsWith('.css')) return null;
        return postcss().process(code);
      },
    },
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.js'),
      name: 'react-cron-schedule-typescript',
      fileName: (format) => `dist/${format === 'es' ? 'index.mjs' : 'index.cjs'}`,
    },
    rollupOptions: {
      // Specify external dependencies
      external: id => /^node:/.test(id),
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
});
