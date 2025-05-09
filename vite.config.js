import path, { join } from 'path';
import { fileURLToPath } from 'url';

import viteReact from '@vitejs/plugin-react';
import viteFastifyReact from '@fastify/react/plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  root: join(import.meta.dirname, 'src', 'client'),
  build: {
    emptyOutDir: true,
    outDir: join(import.meta.dirname, 'dist'),
  },
  plugins: [
    viteReact(),
    viteFastifyReact({
      ts: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
