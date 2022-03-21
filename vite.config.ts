import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { pathToArray } from 'graphql/jsutils/Path';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      components: path.resolve(__dirname, './src/components'),
      common: path.resolve(__dirname, './src/common'),
      layout: path.resolve(__dirname, './src/layout'),
      helpers: path.resolve(__dirname, './src/helpers'),
      hooks: path.resolve(__dirname, './src/hooks'),
      assets: path.resolve(__dirname, './src/assets'),
      src: path.resolve(__dirname, './src'),
    },
  },
  plugins: [react()],
  css: {
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCaseOnly',
    },
  },
});
