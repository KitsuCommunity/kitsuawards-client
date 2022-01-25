import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { pathToArray } from 'graphql/jsutils/Path';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
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
