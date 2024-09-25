import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

import pkg from './package.json';

export default defineConfig(() => {
	return {
		__APP_VERSION__: pkg.version,
		plugins: [sveltekit()],
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}']
		}
	};
});
