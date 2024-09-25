import { get, writable } from 'svelte/store';

export interface SessionData {
	token: string;
}

export const sessionStore = writable<SessionData | undefined>();

// sessionStore.subscribe((session) => console.debug({ session }));

export function getUserInfo(session = get(sessionStore)) {
	if (!session?.token) return;

	let data: { [x: string]: string | number };
	try {
		data = JSON.parse(atob(session.token.split('.')[1]));
		return data;
	} catch (e) {
		console.error('Failed to parse userinfo from JWT:', e);
	}
}
