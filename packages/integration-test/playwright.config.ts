import { type PlaywrightTestConfig, devices } from '@playwright/test';

const known_devices = {
	chromium: devices['Desktop Chrome'],
	firefox: devices['Desktop Firefox'],
	safari: devices['Desktop Safari']
};
const test_browser =
	/** @type {keyof typeof known_devices} */ process.env.KIT_E2E_BROWSER ?? 'chromium';

const test_browser_device = known_devices[test_browser];

if (!test_browser_device) {
	throw new Error(
		`invalid test browser specified: KIT_E2E_BROWSER=${
			process.env.KIT_E2E_BROWSER
		}. Allowed values: ${Object.keys(known_devices).join(', ')}`
	);
}

const config: PlaywrightTestConfig = {
	forbidOnly: !!process.env.CI,
	timeout: process.env.CI ? 45000 : 15000,
	webServer: {
		command: process.env.DEV ? 'npm run dev' : 'npm run build && npm run preview',
		port: process.env.DEV ? 5173 : 4173
	},
	retries: process.env.CI ? 5 : 0,
	projects: [
		{
			name: `${test_browser}-${process.env.DEV ? 'dev' : 'build'}`,
			use: {
				javaScriptEnabled: true
			}
		},
		{
			name: `${test_browser}-${process.env.DEV ? 'dev' : 'build'}-no-js`,
			use: {
				javaScriptEnabled: false
			}
		}
	],
	use: {
		...test_browser_device,
		screenshot: 'only-on-failure',
		trace: 'retain-on-failure'
	},
	workers: process.env.CI ? 2 : undefined
};

export default config;
