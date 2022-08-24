import { expect, test } from '@playwright/test';

test('displays correct environment variables', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('#public-exists')).toBe('hello, world');
	expect(await page.textContent('#public-might-exist')).toBe('hello, possibly-undefined world');
	expect(await page.textContent('#private-exists')).toBe('hello, secret world');
	expect(await page.textContent('#private-might-exist')).toBe(
		'hello, possibly-undefined secret world'
	);
});
