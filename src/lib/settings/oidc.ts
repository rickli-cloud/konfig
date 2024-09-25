/*
 * SERVER ONLY!
 */

import { Issuer } from 'openid-client';
import { PUBLIC_FRONTEND_URL, PUBLIC_OIDC_CLIENT_ID, PUBLIC_OIDC_ISSUER_URL } from './config';
import { building } from '$app/environment';

export const callbackUri = new URL(PUBLIC_FRONTEND_URL);
callbackUri.pathname = '/oauth/callback';

export const oidcIssuer = await Issuer.discover(PUBLIC_OIDC_ISSUER_URL).catch((e) => {
	if (!building) throw e;
	return undefined;
});

export const oidcClient = oidcIssuer
	? new oidcIssuer.Client({
			client_id: PUBLIC_OIDC_CLIENT_ID,
			client_secret: '',
			redirect_uris: [callbackUri.toString()],
			response_types: ['code']
		})
	: undefined;
