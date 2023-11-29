import path from 'path';

import { preact } from '@preact/preset-vite';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      // Make sure to update changes in tsconfig and .eslintrc as well
      react: path.resolve(__dirname, './node_modules/preact/compat/'),
      'react-dom': path.resolve(__dirname, './node_modules/preact/compat/'),

      assets: path.resolve(__dirname, './src/assets'),
      common: path.resolve(__dirname, './src/common'),
      components: path.resolve(__dirname, './src/components'),
      generated: path.resolve(__dirname, './src/generated'),
      // graphql: path.resolve(__dirname, './src/graphql'),
      hooks: path.resolve(__dirname, './src/hooks'),
      layout: path.resolve(__dirname, './src/layout'),
      pages: path.resolve(__dirname, './src/pages'),
      signals: path.resolve(__dirname, './src/signals'),
      styles: path.resolve(__dirname, './src/styles'),
      types: path.resolve(__dirname, './src/types'),
      utils: path.resolve(__dirname, './src/utils'),
      src: path.resolve(__dirname, './src'),
    },
  },
  plugins: [preact()],
  css: {
    modules: {
      scopeBehaviour: 'local',
      localsConvention: 'camelCaseOnly',
    },
  },
});
