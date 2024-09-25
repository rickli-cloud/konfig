import { stringify } from 'yaml';

import {
	PUBLIC_API_HOST,
	PUBLIC_OIDC_CLIENT_ID,
	PUBLIC_OIDC_ISSUER_URL
} from '$lib/settings/config';
import { getUserInfo, sessionStore } from '$lib/store/session';
import { get } from 'svelte/store';

export const generateKubeconfig = (userInfo = getUserInfo(), session = get(sessionStore)): string =>
	stringify({
		apiVersion: 'v1',
		kind: 'Config',
		'current-context': 'oidc',
		preferences: {},
		clusters: [
			{
				name: 'oidc',
				cluster: {
					server: PUBLIC_API_HOST
				}
			}
		],
		contexts: [
			{
				name: 'oidc',
				context: {
					cluster: 'oidc',
					namespace: 'default',
					user: userInfo?.preferred_username
				}
			}
		],
		users: [
			{
				name: userInfo?.preferred_username,
				user: {
					'auth-provider': {
						name: 'oidc',
						config: {
							'idp-issuer-url': PUBLIC_OIDC_ISSUER_URL,
							'client-id': PUBLIC_OIDC_CLIENT_ID,
							'id-token': session?.token
						}
					}
				}
			}
		]
	});
