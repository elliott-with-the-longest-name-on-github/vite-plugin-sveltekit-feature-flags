<script lang="ts">
	import type { PageData } from './$types';

	import { env } from 'virtual:feature-flags/public';

	export let data: PageData;
</script>

<p id="public-exists">{env.PUBLIC_EXISTS}</p>
<p id="public-might-exist">{env.PUBLIC_MIGHT_EXIST}</p>
<p id="private-exists">{data.PRIVATE_EXISTS}</p>
<p id="private-might-exist">{data.PRIVATE_MIGHT_EXIST}</p>
