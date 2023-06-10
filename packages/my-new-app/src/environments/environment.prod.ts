const { host, port } = window.location;

export const environment = {
  production: false,
  apiHost: port ? `http://${host}:${port}` : `http://${host}`,
};
