# vite-plugin-sveltekit-feature-flags

For use with SvelteKit. Turns static environment variables from `$env/static/*` into optional feature flags in `virtual:feature-flags/*`.

Is the package name long? Yes. Get over it. You have to import it _once_.

```bash
pnpm i -D @tcc-sejohnson/vite-plugin-sveltekit-feature-flags # or whatever your favorite package manager wants
```

Before:

```ts
import { PUBLIC_FOO } from '$env/static/public';
// if PUBLIC_FOO isn't in your environment at buildtime, the build will crash
```

After:

```ts
import { env } from 'virtual:feature-flags/public';
// if env.PUBLIC_FOO exists, it will be statically replaced at buildtime. If not, you get your default!
const feature = env.PUBLIC_FOO ?? 'default';
```

## Usage

```ts
// vite.config.js
import { defineConfig } from 'vite';
import { featureFlags } from 'vite-plugin-sveltekit-feature-flags';

export default defineConfig({
	plugins: [
		featureFlags({
			/* plugin options */
		})
	]
});
```

Be sure to add the following to your `src/app.d.ts` (suggestions welcome from TS gurus on better ways to do this):

```ts
declare module 'virtual:feature-flags/public' {
	export let env: Partial<typeof import('$env/static/public')> & Record<string, string | undefined>;
}

declare module 'virtual:feature-flags/private' {
	export let env: Partial<typeof import('$env/static/private')> &
		Record<string, string | undefined>;
}
```

## Documentation

### Config

Currently, there is no config. I set the plugin up as a function just in case we need some in the future. :)

## License

[MIT](./LICENSE)
