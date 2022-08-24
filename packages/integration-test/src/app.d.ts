// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface PrivateEnv {}
	// interface PublicEnv {}
}

declare module 'virtual:feature-flags/public' {
	export let env: Partial<typeof import('$env/static/public')> & Record<string, string | undefined>;
}

declare module 'virtual:feature-flags/private' {
	export let env: Partial<typeof import('$env/static/private')> &
		Record<string, string | undefined>;
}
