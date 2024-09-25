import { dev } from '$app/environment';
import type { Cookies } from '@sveltejs/kit';

type CookieOptions = Parameters<Cookies['set']>['2'];

export enum StorageIdentifiers {
	_base = 'konfig_',

	/* Cookies */

	/** OIDC id token */
	sessionToken = _base + 'sess',
	/** OIDC auth request nonce */
	authCode = _base + 'auth_code'
}

export const sessionTokenOptions: CookieOptions = {
	path: '/',
	secure: !dev,
	sameSite: 'lax',
	httpOnly: false
};

export const authCodeOptions: CookieOptions = {
	path: '/',
	secure: !dev,
	sameSite: 'lax',
	httpOnly: true
};
