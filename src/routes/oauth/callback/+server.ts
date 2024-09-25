import { callbackUri, oidcClient } from '$lib/settings/oidc';
import { authCodeOptions, sessionTokenOptions, StorageIdentifiers } from '$lib/settings/storage.js';
import { error, redirect } from '@sveltejs/kit';

export async function GET({ cookies, url }) {
	const params = oidcClient?.callbackParams(url.href);
	const code_verifier = cookies.get(StorageIdentifiers.authCode);

	if (!params || !Object.keys(params).length) {
		throw new Error('failed to get params');
	}

	const tokenSet = await oidcClient
		?.callback(callbackUri.toString(), params, {
			code_verifier
		})
		.catch((err) => {
			console.error('Error during OIDC callback:', err);
			return error(500, { message: 'Internal Server Error' });
		});

	if (!tokenSet?.id_token) {
		throw new Error('Callback was successful but OIDC provider did not return id_token');
	}

	const expires: Date | undefined = tokenSet.expires_at
		? new Date(tokenSet.expires_at * 1000)
		: undefined;

	cookies.set(StorageIdentifiers.sessionToken, tokenSet.id_token, {
		...sessionTokenOptions,
		expires
	});
	cookies.delete(StorageIdentifiers.authCode, authCodeOptions);

	return redirect(302, '/');
}
