import { sveltekit } from '@sveltejs/kit/vite';
import { featureFlags } from '@tcc-sejohnson/vite-plugin-sveltekit-feature-flags';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), featureFlags()]
};

export default config;
