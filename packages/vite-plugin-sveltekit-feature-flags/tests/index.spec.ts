import { describe, it, expect } from 'vitest';
import { featureFlags } from '../src';

describe('vite-plugin-sveltekit-feature-flags', () => {
	it('should be named', function () {
		expect(featureFlags().name).toBe('vite-plugin-sveltekit-feature-flags');
	});
	it('should be post', () => {
		expect(featureFlags().enforce).to.equal('post');
	});
});
