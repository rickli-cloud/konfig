import { env } from '$env/dynamic/public';
import { ConfigurationError } from '$lib/utils/error';

export const {
	PUBLIC_FRONTEND_URL,
	PUBLIC_OIDC_ISSUER_URL,
	PUBLIC_OIDC_CLIENT_ID,
	PUBLIC_OIDC_SCOPES = 'openid email profile',
	PUBLIC_API_HOST
} = env as {
	PUBLIC_FRONTEND_URL: string;
	PUBLIC_OIDC_ISSUER_URL: string;
	PUBLIC_OIDC_CLIENT_ID: string;
	PUBLIC_OIDC_SCOPES: string;
	PUBLIC_API_HOST: string;
};

if (typeof PUBLIC_FRONTEND_URL === 'undefined') {
	throw new ConfigurationError('Required environment variable PUBLIC_FRONTEND_URL is undefined');
}
if (typeof PUBLIC_OIDC_ISSUER_URL === 'undefined') {
	throw new ConfigurationError('Required environment variable OIDC_ISSUER_URL is undefined');
}
if (typeof PUBLIC_OIDC_CLIENT_ID === 'undefined') {
	throw new ConfigurationError('Required environment variable OIDC_CLIENT_ID is undefined');
}
if (typeof PUBLIC_API_HOST === 'undefined') {
	throw new ConfigurationError('Required environment variable PUBLIC_API_HOST is undefined');
}
