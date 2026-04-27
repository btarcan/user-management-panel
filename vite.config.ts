import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@components': path.resolve(__dirname, './src/components'),
			'@features': path.resolve(__dirname, './src/features'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@services': path.resolve(__dirname, './src/services'),
			'@store': path.resolve(__dirname, './src/store'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@tests': path.resolve(__dirname, './src/tests'),
		},
	},

	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: ['./src/tests/setup.ts'],
		css: false,
	},
	build: {
		target: 'ES2020',
		sourcemap: true,
		rollupOptions: {
			output: {
				manualChunks: {
					react: ['react', 'react-dom'],
					redux: ['@reduxjs/toolkit', 'react-redux'],
					headless: ['@headlessui/react'],
				},
			},
		},
	},
	server: {
		port: 3000,
		open: true,
	},
});
