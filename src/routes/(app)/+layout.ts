import { StorageIdentifiers } from '$lib/settings/storage';
import { sessionStore } from '$lib/store/session';
import { getCookies } from '$lib/utils/cookies';

export async function load() {
	const token = getCookies()[StorageIdentifiers.sessionToken];

	if (token) sessionStore.set({ token });
}
