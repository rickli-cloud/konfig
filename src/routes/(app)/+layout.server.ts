import { StorageIdentifiers } from '$lib/settings/storage.js';
import { redirect } from '@sveltejs/kit';

import { base } from '$app/paths';

export async function load({ cookies }) {
	if (!cookies.get(StorageIdentifiers.sessionToken)?.length) {
		return redirect(302, base + '/oauth/redirect');
	}
}
