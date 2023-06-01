import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { pathToArray } from 'graphql/jsutils/Path';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      assets: path.resolve(__dirname, './src/assets'),
      common: path.resolve(__dirname, './src/common'),
      components: path.resolve(__dirname, './src/components'),
      generated: path.resolve(__dirname, './src/generated'),
      // graphql: path.resolve(__dirname, './src/graphql'),
      helpers: path.resolve(__dirname, './src/helpers'),
      hooks: path.resolve(__dirname, './src/hooks'),
      layout: path.resolve(__dirname, './src/layout'),
      pages: path.resolve(__dirname, './src/pages'),
      styles: path.resolve(__dirname, './src/styles'),
      types: path.resolve(__dirname, './src/types'),
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
