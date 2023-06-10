// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.

const host = process.env.NX_API_HOST || 'http://127.0.0.1:3000';

export const environment = {
  production: false,
  apiHost: `${host}`,
};
