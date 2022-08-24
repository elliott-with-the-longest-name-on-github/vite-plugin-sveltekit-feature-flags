import { env } from 'virtual:feature-flags/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	return {
		PRIVATE_EXISTS: env.PRIVATE_EXISTS,
		PRIVATE_MIGHT_EXIST: env.PRIVATE_MIGHT_EXIST
	};
};
