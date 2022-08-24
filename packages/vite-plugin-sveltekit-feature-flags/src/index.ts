import type { Options } from './options';
import type { Plugin } from 'vite';

const moduleIdPrefix = 'virtual:feature-flags' as const;
const privateModuleId = `${moduleIdPrefix}/private` as const;
const publicModuleId = `${moduleIdPrefix}/public` as const;

type ModuleId = typeof privateModuleId | typeof publicModuleId;
type PrefixedModuleId = `\0${ModuleId}`;

const createModule = (type: 'public' | 'private'): string => {
	return `import * as env from '$env/static/${type}';\nexport { env };`;
};

// eslint-disable-next-line no-unused-vars
export function featureFlags(inlineOptions?: Partial<Options>): Plugin {
	return {
		name: 'vite-plugin-sveltekit-feature-flags',
		enforce: 'post',
		resolveId: (source) => {
			if ([privateModuleId, publicModuleId].includes(source as ModuleId)) {
				return `\0${source}`;
			}
		},
		load: (id) => {
			const moduleId = id as PrefixedModuleId;
			switch (moduleId) {
				case '\0virtual:feature-flags/private':
					return createModule('private');
				case '\0virtual:feature-flags/public':
					return createModule('public');
				default: {
					const _: never = moduleId;
					return undefined && _;
				}
			}
		}
	};
}
