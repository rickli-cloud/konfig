import { generators } from 'openid-client';
import { redirect } from '@sveltejs/kit';

import { authCodeOptions, sessionTokenOptions, StorageIdentifiers } from '$lib/settings/storage.js';
import { PUBLIC_OIDC_SCOPES } from '$lib/settings/config';
import { oidcClient } from '$lib/settings/oidc.js';

export function GET({ cookies }) {
	const code_verifier = generators.codeVerifier();
	const code_challenge = generators.codeChallenge(code_verifier);

	const sessionCookie = cookies.get(StorageIdentifiers.sessionToken);

	if (sessionCookie?.length) {
		cookies.delete(StorageIdentifiers.sessionToken, sessionTokenOptions);
	}

	cookies.set(StorageIdentifiers.authCode, code_verifier, authCodeOptions);

	return redirect(
		302,
		oidcClient?.authorizationUrl({
			scope: PUBLIC_OIDC_SCOPES,
			code_challenge,
			code_challenge_method: 'S256'
		}) || '/'
	);
}
