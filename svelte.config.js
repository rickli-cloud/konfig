import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

import dotenv from 'dotenv';
dotenv.config();

const { BASE_PATH } = process.env;

/** @type {typeof import("./package.json")}; */
const pkg = JSON.parse(
	readFileSync(fileURLToPath(new URL('package.json', import.meta.url)), 'utf8')
);

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		paths: {
			base: BASE_PATH
		},
		version: {
			name: pkg.version
		}
	}
};

export default config;
