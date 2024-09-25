# Konfig

Grab a kubeconfig with OIDC login flow

## Environment configuration

| Name                   | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| PUBLIC_FRONTEND_URL    | Used for OIDC redirect_uri                                     |
| PUBLIC_OIDC_ISSUER_URL | Issuer url without .well-known/openid-configuration            |
| PUBLIC_OIDC_CLIENT_ID  | Client id                                                      |
| PUBLIC_OIDC_SCOPES     | Default `openid email profile`                                 |
| PUBLIC_API_HOST        | Kubernetes endpoint. Does not need to be reachable for the app |

## Deploy

```sh
docker run -it --env-file $PWD/.env -p 3000 ghcr.io/rickli-cloud/konfig:latest
```

## Developing

Once you've installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version:

```sh
npm run build
```

> You can preview the production build with `npm run preview`.

### Docker image

```sh
docker build . -t konfig
```
